const fs = require('fs');
const path = require('path');

// Define source and destination paths
const sourceDir = path.join(process.cwd(), 'src/db');
const destDir = "/var/task/.next/db"
// path.join(process.cwd(), '.next/db');

// Function to copy folder recursively
function copyFolderSync(source, destination) {
    if (!fs.existsSync(source)) {
        console.log(`Source folder "${source}" does not exist. Skipping.`);
        return;
    }

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const srcFile = path.join(source, file);
        const destFile = path.join(destination, file);
        if (fs.lstatSync(srcFile).isDirectory()) {
            console.log(`🟡Copying file "${srcFile}" to "${destFile}"`);
            copyFolderSync(srcFile, destFile); // Recursively copy subdirectories
        } else {
            console.log(`🟡Copying file "${srcFile}" to "${destFile}"`);
            fs.copyFileSync(srcFile, destFile);
        }
    });

    console.log(`✅ Moved "db" folder to "${destDir}" successfully!`);
}

// Run the function to move db folder

setTimeout(() => {

    copyFolderSync(sourceDir, destDir);
}, 2000);
