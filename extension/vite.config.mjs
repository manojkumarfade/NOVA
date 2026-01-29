import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to copy manifest to dist
const copyManifest = () => {
    return {
        name: 'copy-manifest',
        closeBundle() {
            const manifestPath = resolve(__dirname, 'manifest.json');
            const distDir = resolve(__dirname, 'dist');
            const distPath = resolve(distDir, 'manifest.json');

            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }

            if (fs.existsSync(manifestPath)) {
                fs.copyFileSync(manifestPath, distPath);
                console.log(`Copied manifest to ${distPath}`);
            }
        }
    };
};

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [react(), copyManifest()],
    root: __dirname,
    base: './',
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer
            ]
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                sidepanel: resolve(__dirname, 'src/sidepanel/index.html'),
                options: resolve(__dirname, 'src/options/index.html'),
                background: resolve(__dirname, 'src/background/index.js'),
                content: resolve(__dirname, 'src/content/content-script.js')
            },
            output: {
                entryFileNames: 'src/[name]/index.js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]',
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    ui: ['@radix-ui/react-slot', 'lucide-react', 'framer-motion'],
                    utils: ['date-fns', 'clsx', 'tailwind-merge']
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});
