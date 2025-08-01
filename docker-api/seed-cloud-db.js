const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MongoDB Configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'devops_learning_hub';

console.log('🌱 DevOps Learning Hub - MongoDB Cloud Seeder');
console.log('================================================');

async function seedDatabase() {
  let client;
  
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB Cloud...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Cloud successfully!');
    
    const db = client.db(DB_NAME);
    
    // Clear existing collections
    console.log('\n🧹 Clearing existing collections...');
    try {
      await db.collection('tools').deleteMany({});
      await db.collection('concepts').deleteMany({});
      console.log('✅ Collections cleared');
    } catch (error) {
      console.log('ℹ️  Collections don\'t exist yet, will be created');
    }
    
    // Load and insert tools
    console.log('\n📚 Loading tools data...');
    const toolsDir = path.join(__dirname, '..', 'src', 'data', 'tools');
    const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.json'));
    
    const tools = [];
    for (const file of toolFiles) {
      const toolData = JSON.parse(fs.readFileSync(path.join(toolsDir, file), 'utf8'));
      tools.push(toolData);
      console.log(`  📦 Loaded tool: ${toolData.name} (${toolData.id})`);
    }
    
    if (tools.length > 0) {
      await db.collection('tools').insertMany(tools);
      console.log(`✅ Inserted ${tools.length} tools into MongoDB`);
    }
    
    // Load and insert concepts
    console.log('\n🎓 Loading concepts data...');
    const conceptsDir = path.join(__dirname, '..', 'src', 'data', 'concepts');
    const conceptFiles = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.json'));
    
    const concepts = [];
    for (const file of conceptFiles) {
      try {
        const conceptData = JSON.parse(fs.readFileSync(path.join(conceptsDir, file), 'utf8'));
        concepts.push(conceptData);
        console.log(`  📝 Loaded concept: ${conceptData.title} (${conceptData.id})`);
      } catch (error) {
        console.log(`  ⚠️  Skipped invalid file: ${file} - ${error.message}`);
      }
    }
    
    if (concepts.length > 0) {
      await db.collection('concepts').insertMany(concepts);
      console.log(`✅ Inserted ${concepts.length} concepts into MongoDB`);
    }
    
    // Create indexes for better performance
    console.log('\n🔍 Creating database indexes...');
    await db.collection('tools').createIndex({ id: 1 }, { unique: true });
    await db.collection('tools').createIndex({ category: 1 });
    await db.collection('concepts').createIndex({ id: 1 }, { unique: true });
    await db.collection('concepts').createIndex({ category: 1 });
    await db.collection('concepts').createIndex({ difficulty: 1 });
    await db.collection('concepts').createIndex({ tags: 1 });
    console.log('✅ Database indexes created');
    
    // Verify data
    console.log('\n📊 Verifying data...');
    const toolsCount = await db.collection('tools').countDocuments();
    const conceptsCount = await db.collection('concepts').countDocuments();
    
    console.log(`✅ Total tools in database: ${toolsCount}`);
    console.log(`✅ Total concepts in database: ${conceptsCount}`);
    
    // Show sample data
    console.log('\n🔍 Sample tools:');
    const sampleTools = await db.collection('tools').find({}).limit(3).toArray();
    sampleTools.forEach(tool => {
      console.log(`  - ${tool.name} (${tool.id}): ${tool.description}`);
    });
    
    console.log('\n🔍 Sample concepts:');
    const sampleConcepts = await db.collection('concepts').find({}).limit(3).toArray();
    sampleConcepts.forEach(concept => {
      console.log(`  - ${concept.title} (${concept.id}): ${concept.description}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🚀 Your cloud MongoDB is now ready for the API server');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('📡 MongoDB connection closed');
    }
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = { seedDatabase };
