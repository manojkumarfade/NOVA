
import * as pdfjsLib from 'pdfjs-dist';

// Import worker directly using Vite's ?url suffix to get the hashed asset path
// This ensures it is bundled locally and works with MV3 CSP
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const ContentReader = {
    /**
     * Read all attachments and return structured result.
     * Returns { textContent: string, imageDataUrls: string[] }
     * - textContent: extracted text from documents, CSVs, PDFs, etc.
     * - imageDataUrls: base64 data URLs for images (to be sent as vision messages)
     */
    read: async (attachments) => {
        if (!attachments || attachments.length === 0) return { textContent: "", imageDataUrls: [] };

        let textParts = [];
        let imageDataUrls = [];

        for (const att of attachments) {
            try {
                const { file, type } = att;

                if (type === 'image') {
                    // Convert image to base64 data URL for vision-capable models
                    try {
                        const dataUrl = await ContentReader.readFileAsBase64(file);
                        imageDataUrls.push(dataUrl);
                        textParts.push(`[Image Attached: ${file.name}]`);
                    } catch (e) {
                        textParts.push(`[Image: ${file.name} — could not read]`);
                    }
                } else if (type === 'video') {
                    // Videos can't be read as text in-browser
                    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                    textParts.push(`[Video Attached: ${file.name} | Type: ${file.type} | Size: ${sizeMB} MB]\nNote: Video content cannot be analyzed directly. The user uploaded this video for reference.`);
                } else if (file.type === 'application/pdf') {
                    const pdfText = await ContentReader.readPdf(file);
                    textParts.push(`[PDF: ${file.name}]\n${pdfText}`);
                } else if (file.name.endsWith('.docx')) {
                    try {
                        const docText = await ContentReader.readDocx(file);
                        textParts.push(`[Document: ${file.name}]\n${docText}`);
                    } catch (e) {
                        // Fallback: read raw bytes as text (partial content)
                        const raw = await ContentReader.readFileAsText(file);
                        const cleaned = raw.replace(/[^\x20-\x7E\n\r\t]/g, '').replace(/\s{3,}/g, ' ').trim();
                        textParts.push(`[Document: ${file.name}]\n${cleaned.substring(0, 5000)}`);
                    }
                } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                    textParts.push(`[Spreadsheet: ${file.name} | ${(file.size / 1024).toFixed(1)} KB]\nNote: Binary spreadsheet content cannot be parsed in-browser. Please export as CSV for full text extraction.`);
                } else if (file.name.endsWith('.csv')) {
                    const csvText = await ContentReader.readFileAsText(file);
                    textParts.push(`[CSV: ${file.name}]\n${csvText.substring(0, 10000)}`);
                } else {
                    // Text/Code/JSON/Markdown and other text-based files
                    const text = await ContentReader.readFileAsText(file);
                    textParts.push(`[File: ${file.name}]\n${text.substring(0, 15000)}`);
                }
            } catch (e) {
                console.error(`ContentReader: Failed to read ${att.file?.name}`, e);
                textParts.push(`[Error reading ${att.file?.name}: ${e.message}]`);
            }
        }

        return {
            textContent: textParts.join("\n\n"),
            imageDataUrls: imageDataUrls
        };
    },

    readFileAsText: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    },

    readFileAsBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result); // Returns data:image/...;base64,...
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    },

    readDocx: async (file) => {
        // DOCX files are ZIP archives. We decode the raw bytes and extract
        // text from XML tags (w:t elements contain the actual text).
        const arrayBuffer = await file.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const rawText = decoder.decode(uint8);

        // Extract text between <w:t> tags (Word document text nodes)
        const textMatches = rawText.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
        if (textMatches && textMatches.length > 0) {
            const extractedText = textMatches.map(match => {
                return match.replace(/<[^>]+>/g, '');
            }).join(' ');
            return extractedText.substring(0, 15000);
        }

        // Fallback: strip all XML tags and return readable text
        const stripped = rawText.replace(/<[^>]+>/g, ' ').replace(/[^\x20-\x7E\n\r\t]/g, '').replace(/\s+/g, ' ').trim();
        return stripped.substring(0, 10000) || 'Could not extract text from this document.';
    },

    readPdf: async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = "";
        const maxPages = Math.min(pdf.numPages, 20); // Limit to 20 pages

        for (let i = 1; i <= maxPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }

        return fullText.substring(0, 15000); // Limit total text
    },

    // Categorize file into type bucket
    categorizeFile: (file) => {
        if (!file) return 'document';
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        if (file.type.startsWith('audio/')) return 'audio';
        return 'document';
    }
};
