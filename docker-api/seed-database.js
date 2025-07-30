const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MongoDB Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:devops123@localhost:27017/devops_learning_hub?authSource=admin';
const DB_NAME = 'devops_learning_hub';

async function seedDatabase() {
  let client;
  
  try {
    console.log('🌱 Starting database seeding process...');
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Load tools data
    console.log('📊 Loading tools data...');
    const toolsDir = path.join(__dirname, 'data', 'tools');
    const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.json'));
    
    const tools = toolFiles.map(file => {
      const content = fs.readFileSync(path.join(toolsDir, file), 'utf-8');
      return JSON.parse(content);
    });
    
    // Load concepts data
    console.log('📚 Loading concepts data...');
    const conceptsDir = path.join(__dirname, 'data', 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.json'));
    
    const concepts = conceptFiles.map(file => {
      const content = fs.readFileSync(path.join(conceptsDir, file), 'utf-8');
      return JSON.parse(content);
    });
    
    // Clear existing collections
    console.log('🧹 Clearing existing collections...');
    await db.collection('tools').deleteMany({});
    await db.collection('concepts').deleteMany({});
    
    // Insert tools
    console.log('🔧 Inserting tools...');
    if (tools.length > 0) {
      await db.collection('tools').insertMany(tools);
      console.log(`✅ Inserted ${tools.length} tools`);
    }
    
    // Insert concepts
    console.log('💡 Inserting concepts...');
    if (concepts.length > 0) {
      await db.collection('concepts').insertMany(concepts);
      console.log(`✅ Inserted ${concepts.length} concepts`);
    }
    
    // Create indexes for better performance
    console.log('🚀 Creating indexes...');
    await db.collection('tools').createIndex({ "id": 1 }, { unique: true });
    await db.collection('tools').createIndex({ "name": 1 });
    await db.collection('tools').createIndex({ "category": 1 });
    
    await db.collection('concepts').createIndex({ "id": 1 }, { unique: true });
    await db.collection('concepts').createIndex({ "toolId": 1 });
    await db.collection('concepts').createIndex({ "difficulty": 1 });
    await db.collection('concepts').createIndex({ "name": 1 });
    await db.collection('concepts').createIndex({ "tags": 1 });
    
    console.log('✅ Created database indexes');
    
    // Verify data
    const toolCount = await db.collection('tools').countDocuments();
    const conceptCount = await db.collection('concepts').countDocuments();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Total tools: ${toolCount}`);
    console.log(`📚 Total concepts: ${conceptCount}`);
    
    // Show some sample data
    console.log('\n📋 Sample tools:');
    const sampleTools = await db.collection('tools').find({}).limit(3).toArray();
    sampleTools.forEach(tool => {
      console.log(`  - ${tool.name} (${tool.category})`);
    });
    
    console.log('\n📖 Sample concepts:');
    const sampleConcepts = await db.collection('concepts').find({}).limit(3).toArray();
    sampleConcepts.forEach(concept => {
      console.log(`  - ${concept.name} (${concept.difficulty}) - Tool: ${concept.toolId}`);
    });
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('📡 MongoDB connection closed');
    }
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = seedDatabase;
