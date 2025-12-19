const fs = require('fs');
const path = require('path');

// Directory containing the HTML files
const directory = __dirname;

// Find all HTML files in the directory
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html') && file !== 'ribbon.html');

// The navigation replacement content
const ribbonLoader = '  <!-- Ribbon Navigation will be loaded here by ribbon-loader.js -->\n  <script src="js/ribbon-loader.js"></script>';

// The old navigation pattern to be replaced
const oldNavPattern = /<!-- Navigation -->[\s\S]*?<\/nav>/i;

// Process each HTML file
files.forEach(file => {
  const filePath = path.join(directory, file);
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the old navigation with the ribbon loader
    const updatedContent = content.replace(oldNavPattern, ribbonLoader);
    
    // If the content was changed, write it back to the file
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated navigation in ${file}`);
    } else {
      console.log(`No navigation found in ${file} or already updated`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('Navigation update complete!');
