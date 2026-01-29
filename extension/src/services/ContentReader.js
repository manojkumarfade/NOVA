
import * as pdfjsLib from 'pdfjs-dist';

// Import worker directly using Vite's ?url suffix to get the hashed asset path
// This ensures it is bundled locally and works with MV3 CSP
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const ContentReader = {
    read: async (attachments) => {
        if (!attachments || attachments.length === 0) return "";

        let contentParts = [];

        for (const att of attachments) {
            try {
                const { file, type } = att;
                let text = "";

                if (type === 'image') {
                    // For now, we just acknowledge the image. 
                    // Future: Base64 encode for Vision models.
                    text = `[Image Attached: ${file.name}]`;
                } else if (file.type === 'application/pdf') {
                    text = await ContentReader.readPdf(file);
                    text = `[PDF File: ${file.name}]\n${text}`;
                } else {
                    // Text/Code/JSON/CSV
                    text = await ContentReader.readFileAsText(file);
                    text = `[File: ${file.name}]\n${text}`;
                }

                contentParts.push(text);
            } catch (e) {
                console.error(`Failed to read file ${att.file.name}`, e);
                contentParts.push(`[Error reading ${att.file.name}: ${e.message}]`);
            }
        }

        return contentParts.join("\n\n");
    },

    readFileAsText: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    },

    readPdf: async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }

        return fullText;
    }
};
