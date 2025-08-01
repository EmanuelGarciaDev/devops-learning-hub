const fs = require('fs');
const path = require('path');

console.log('Testing JSON parsing...');

try {
    // Test concepts directory
    const conceptsDir = path.join(process.cwd(), 'src', 'data', 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.json'));
    
    console.log(`Found ${conceptFiles.length} concept files`);
    
    for (const file of conceptFiles) {
        try {
            const filePath = path.join(conceptsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(content);
            console.log(`✅ ${file} - ${data.name || data.id}`);
        } catch (error) {
            console.log(`❌ ${file} - Error: ${error.message}`);
        }
    }

    // Test tools directory
    const toolsDir = path.join(process.cwd(), 'src', 'data', 'tools');
    const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.json'));
    
    console.log(`\nFound ${toolFiles.length} tool files`);
    
    for (const file of toolFiles) {
        try {
            const filePath = path.join(toolsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(content);
            console.log(`✅ ${file} - ${data.name || data.id}`);
        } catch (error) {
            console.log(`❌ ${file} - Error: ${error.message}`);
        }
    }
    
} catch (error) {
    console.error('Script error:', error);
}
