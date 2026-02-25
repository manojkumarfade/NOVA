const fs = require('fs');
const path = require('path');

const srcManifest = path.join(__dirname, 'manifest.json');
const destManifest = path.join(__dirname, 'dist', 'manifest.json');

if (fs.existsSync(srcManifest)) {
    if (!fs.existsSync(path.dirname(destManifest))) {
        fs.mkdirSync(path.dirname(destManifest), { recursive: true });
    }
    fs.copyFileSync(srcManifest, destManifest);
    console.log('Copied manifest.json to dist/manifest.json');
} else {
    console.error('manifest.json not found in root');
    process.exit(1);
}
