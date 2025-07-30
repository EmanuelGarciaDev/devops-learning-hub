const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:devops123@localhost:27017/devops_learning_hub?authSource=admin';
const DB_NAME = 'devops_learning_hub';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
let client;

async function connectToMongoDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB successfully');
    
    // Test collections exist
    const collections = await db.listCollections().toArray();
    console.log(`📚 Found ${collections.length} collections:`, collections.map(c => c.name));
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return false;
  }
}

// Data access class for MongoDB
class MongoDataLoader {
  constructor(database) {
    this.db = database;
    this.toolsCollection = database.collection('tools');
    this.conceptsCollection = database.collection('concepts');
  }

  async getTools() {
    try {
      return await this.toolsCollection.find({}).toArray();
    } catch (error) {
      console.error('Error fetching tools:', error);
      throw error;
    }
  }

  async getTool(id) {
    try {
      return await this.toolsCollection.findOne({ id: id });
    } catch (error) {
      console.error('Error fetching tool:', error);
      throw error;
    }
  }

  async getConcepts(toolId = null) {
    try {
      const filter = toolId ? { toolId: toolId } : {};
      return await this.conceptsCollection.find(filter).toArray();
    } catch (error) {
      console.error('Error fetching concepts:', error);
      throw error;
    }
  }

  async getConcept(id) {
    try {
      return await this.conceptsCollection.findOne({ id: id });
    } catch (error) {
      console.error('Error fetching concept:', error);
      throw error;
    }
  }

  async searchContent(query) {
    try {
      const searchRegex = new RegExp(query, 'i');
      
      // Search tools
      const toolResults = await this.toolsCollection.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex }
        ]
      }).toArray();

      // Search concepts
      const conceptResults = await this.conceptsCollection.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      }).toArray();

      return {
        tools: toolResults.map(tool => ({ ...tool, type: 'tool' })),
        concepts: conceptResults.map(concept => ({ ...concept, type: 'concept' }))
      };
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }

  async getStats() {
    try {
      const [toolsCount, conceptsCount, tools] = await Promise.all([
        this.toolsCollection.countDocuments(),
        this.conceptsCollection.countDocuments(),
        this.toolsCollection.find({}).toArray()
      ]);

      // Get concept counts per tool
      const toolBreakdown = await Promise.all(
        tools.map(async (tool) => ({
          id: tool.id,
          name: tool.name,
          conceptCount: await this.conceptsCollection.countDocuments({ toolId: tool.id })
        }))
      );

      // Get difficulty breakdown
      const difficultyBreakdown = {
        beginner: await this.conceptsCollection.countDocuments({ difficulty: 'beginner' }),
        intermediate: await this.conceptsCollection.countDocuments({ difficulty: 'intermediate' }),
        advanced: await this.conceptsCollection.countDocuments({ difficulty: 'advanced' })
      };

      return {
        totalTools: toolsCount,
        totalConcepts: conceptsCount,
        toolBreakdown,
        difficultyBreakdown
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
}

// Initialize data loader after MongoDB connection
let dataLoader;

// API Routes

// Health check
app.get('/health', async (req, res) => {
  const mongoStatus = db ? 'connected' : 'disconnected';
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0-mongodb',
    database: {
      status: mongoStatus,
      name: DB_NAME
    }
  });
});

// Get all tools
app.get('/api/tools', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }
    
    const tools = await dataLoader.getTools();
    res.json({
      success: true,
      count: tools.length,
      data: tools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific tool
app.get('/api/tools/:id', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const tool = await dataLoader.getTool(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: `Tool '${req.params.id}' not found`
      });
    }
    
    // Include related concepts
    const concepts = await dataLoader.getConcepts(tool.id);
    res.json({
      success: true,
      data: {
        ...tool,
        relatedConcepts: concepts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all concepts or concepts for a specific tool
app.get('/api/concepts', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { toolId, difficulty } = req.query;
    let concepts = await dataLoader.getConcepts(toolId);
    
    // Filter by difficulty if specified
    if (difficulty) {
      concepts = concepts.filter(c => c.difficulty === difficulty);
    }
    
    res.json({
      success: true,
      count: concepts.length,
      filters: { toolId, difficulty },
      data: concepts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific concept
app.get('/api/concepts/:id', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const concept = await dataLoader.getConcept(req.params.id);
    if (!concept) {
      return res.status(404).json({
        success: false,
        error: `Concept '${req.params.id}' not found`
      });
    }
    
    // Include related tool info
    const tool = await dataLoader.getTool(concept.toolId);
    res.json({
      success: true,
      data: {
        ...concept,
        tool: tool
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const stats = await dataLoader.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    if (!dataLoader) {
      return res.status(503).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const { q, type } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      });
    }

    const searchResults = await dataLoader.searchContent(q);
    let results = [];

    // Filter results by type if specified
    if (!type || type === 'tools') {
      results = [...results, ...searchResults.tools];
    }
    if (!type || type === 'concepts') {
      results = [...results, ...searchResults.concepts];
    }

    res.json({
      success: true,
      query: q,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'DevOps Learning Hub API (MongoDB)',
    version: '2.0.0',
    description: 'REST API for DevOps tools and learning concepts with MongoDB backend',
    database: 'MongoDB',
    endpoints: {
      'GET /health': 'Health check endpoint with database status',
      'GET /api/tools': 'Get all tools from MongoDB',
      'GET /api/tools/:id': 'Get specific tool with related concepts',
      'GET /api/concepts': 'Get all concepts (filter by ?toolId=X&difficulty=Y)',
      'GET /api/concepts/:id': 'Get specific concept with tool info',
      'GET /api/stats': 'Get statistics about tools and concepts',
      'GET /api/search': 'Search tools and concepts (?q=query&type=tools|concepts)',
      'GET /api/docs': 'This documentation'
    },
    examples: {
      'Get Docker tool': '/api/tools/docker',
      'Get Docker concepts': '/api/concepts?toolId=docker',
      'Get beginner concepts': '/api/concepts?difficulty=beginner',
      'Search for containers': '/api/search?q=containers',
      'Get specific concept': '/api/concepts/docker-basics'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🐳 DevOps Learning Hub API (MongoDB Edition)',
    version: '2.0.0',
    database: 'MongoDB',
    documentation: '/api/docs',
    health: '/health',
    stats: '/api/stats'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.method} ${req.originalUrl} not found`,
    availableEndpoints: '/api/docs'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
async function startServer() {
  // Connect to MongoDB first
  const connected = await connectToMongoDB();
  
  if (connected) {
    dataLoader = new MongoDataLoader(db);
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 DevOps Learning Hub API (MongoDB) running on port ${PORT}`);
      console.log(`📚 Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`💊 Health check: http://localhost:${PORT}/health`);
      console.log(`🗄️  Database: MongoDB (${DB_NAME})`);
    });
  } else {
    console.error('Failed to start server due to database connection issues');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  if (client) {
    await client.close();
    console.log('📡 MongoDB connection closed');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  if (client) {
    await client.close();
    console.log('📡 MongoDB connection closed');
  }
  process.exit(0);
});

// Start the server
startServer().catch(console.error);
