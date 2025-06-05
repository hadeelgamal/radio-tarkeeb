import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the SVG file
const svgPath = path.join(__dirname, '../src/assets/splash.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Convert class to className
const convertedContent = svgContent.replace(/class=/g, 'className=');

// Write the converted content back to the file
fs.writeFileSync(svgPath, convertedContent, 'utf8');

console.log('Successfully converted class attributes to className in splash.svg'); 