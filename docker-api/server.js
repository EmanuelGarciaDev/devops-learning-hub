const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Data loading utilities
class DataLoader {
  constructor() {
    this.tools = [];
    this.concepts = [];
    this.loadData();
  }

  loadData() {
    try {
      // Load tools
      const toolsDir = path.join(__dirname, 'data', 'tools');
      const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.json'));
      
      this.tools = toolFiles.map(file => {
        const content = fs.readFileSync(path.join(toolsDir, file), 'utf-8');
        return JSON.parse(content);
      });

      // Load concepts
      const conceptsDir = path.join(__dirname, 'data', 'concepts');
      const conceptFiles = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.json'));
      
      this.concepts = conceptFiles.map(file => {
        const content = fs.readFileSync(path.join(conceptsDir, file), 'utf-8');
        return JSON.parse(content);
      });

      console.log(`✅ Loaded ${this.tools.length} tools and ${this.concepts.length} concepts`);
    } catch (error) {
      console.error('❌ Error loading data:', error);
    }
  }

  getTools() {
    return this.tools;
  }

  getTool(id) {
    return this.tools.find(tool => tool.id === id);
  }

  getConcepts(toolId = null) {
    if (toolId) {
      return this.concepts.filter(concept => concept.toolId === toolId);
    }
    return this.concepts;
  }

  getConcept(id) {
    return this.concepts.find(concept => concept.id === id);
  }

  getStats() {
    const toolStats = this.tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      conceptCount: this.concepts.filter(c => c.toolId === tool.id).length
    }));

    return {
      totalTools: this.tools.length,
      totalConcepts: this.concepts.length,
      toolBreakdown: toolStats,
      difficultyBreakdown: {
        beginner: this.concepts.filter(c => c.difficulty === 'beginner').length,
        intermediate: this.concepts.filter(c => c.difficulty === 'intermediate').length,
        advanced: this.concepts.filter(c => c.difficulty === 'advanced').length
      }
    };
  }
}

// Initialize data loader
const dataLoader = new DataLoader();

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Get all tools
app.get('/api/tools', (req, res) => {
  try {
    const tools = dataLoader.getTools();
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
app.get('/api/tools/:id', (req, res) => {
  try {
    const tool = dataLoader.getTool(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: `Tool '${req.params.id}' not found`
      });
    }
    
    // Include related concepts
    const concepts = dataLoader.getConcepts(tool.id);
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
app.get('/api/concepts', (req, res) => {
  try {
    const { toolId, difficulty } = req.query;
    let concepts = dataLoader.getConcepts(toolId);
    
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
app.get('/api/concepts/:id', (req, res) => {
  try {
    const concept = dataLoader.getConcept(req.params.id);
    if (!concept) {
      return res.status(404).json({
        success: false,
        error: `Concept '${req.params.id}' not found`
      });
    }
    
    // Include related tool info
    const tool = dataLoader.getTool(concept.toolId);
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
app.get('/api/stats', (req, res) => {
  try {
    const stats = dataLoader.getStats();
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
app.get('/api/search', (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      });
    }

    const query = q.toLowerCase();
    let results = [];

    // Search tools
    if (!type || type === 'tools') {
      const toolResults = dataLoader.getTools()
        .filter(tool => 
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
        )
        .map(tool => ({ ...tool, type: 'tool' }));
      results = [...results, ...toolResults];
    }

    // Search concepts
    if (!type || type === 'concepts') {
      const conceptResults = dataLoader.getConcepts()
        .filter(concept => 
          concept.name.toLowerCase().includes(query) ||
          concept.description.toLowerCase().includes(query) ||
          concept.tags?.some(tag => tag.toLowerCase().includes(query))
        )
        .map(concept => ({ ...concept, type: 'concept' }));
      results = [...results, ...conceptResults];
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
    title: 'DevOps Learning Hub API',
    version: '1.0.0',
    description: 'REST API for DevOps tools and learning concepts',
    endpoints: {
      'GET /health': 'Health check endpoint',
      'GET /api/tools': 'Get all tools',
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
    message: '🐳 DevOps Learning Hub API',
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DevOps Learning Hub API running on port ${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`💊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  process.exit(0);
});
