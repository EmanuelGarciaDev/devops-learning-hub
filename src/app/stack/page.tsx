import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Technical Stack & Architecture",
  description: "Comprehensive overview of the DevOps Learning Hub technical architecture featuring Docker containerization, MongoDB database, Nginx proxy, and Next.js frontend.",
  keywords: ["Docker", "MongoDB", "Nginx", "Next.js", "Architecture", "DevOps", "Technical Stack"],
};

export default function StackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏗️ Technical Stack & Architecture
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore the modern DevOps architecture powering this learning platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Architecture Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🎯 System Architecture
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Production Architecture
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 font-mono text-sm">
                  <div className="text-blue-600 dark:text-blue-400">Frontend (Vercel)</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── Next.js 15 + TypeScript</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── Tailwind CSS</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">└── Static Generation</div>
                  <div className="mt-4 text-green-600 dark:text-green-400">API Layer (Docker)</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── Express.js REST API</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── MongoDB Connection</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">└── Data Validation</div>
                  <div className="mt-4 text-purple-600 dark:text-purple-400">Infrastructure</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── MongoDB Container</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">├── Nginx Reverse Proxy</div>
                  <div className="ml-2 text-gray-600 dark:text-gray-300">└── Docker Compose</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Flow
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <span className="text-gray-700 dark:text-gray-300">User visits Vercel-hosted frontend</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <span className="text-gray-700 dark:text-gray-300">Next.js loads DevOps content from JSON</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <span className="text-gray-700 dark:text-gray-300">Optional: API requests to Docker backend</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <span className="text-gray-700 dark:text-gray-300">MongoDB serves dynamic data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🛠️ Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Frontend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Turbopack</li>
                </ul>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Express.js</li>
                  <li>• Node.js 18+</li>
                  <li>• REST API</li>
                  <li>• CORS enabled</li>
                </ul>
              </div>
            </div>

            {/* Database */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍃</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Database</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• MongoDB 7.0</li>
                  <li>• Document Store</li>
                  <li>• Indexed Collections</li>
                  <li>• Persistent Volumes</li>
                </ul>
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">DevOps</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Docker</li>
                  <li>• Docker Compose</li>
                  <li>• Nginx Proxy</li>
                  <li>• Vercel Deploy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Docker Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🐳 Docker Containerization
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Container Services
                </h3>
                <div className="space-y-4">
                  <div className="border dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">🗄️ MongoDB Container</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Persistent database with authentication, storing DevOps tools and learning concepts
                    </p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 block">
                      devops-learning-db:27017
                    </code>
                  </div>
                  
                  <div className="border dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">🚀 API Container</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Express.js REST API with MongoDB connection and comprehensive endpoints
                    </p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 block">
                      devops-learning-api:3000
                    </code>
                  </div>
                  
                  <div className="border dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">🌐 Nginx Proxy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Reverse proxy with load balancing, SSL termination, and static file serving
                    </p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 block">
                      devops-proxy:80/443
                    </code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Docker Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✅</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Environment Consistency</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Same environment in development, testing, and production</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✅</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Easy Scaling</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Horizontal scaling with container orchestration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✅</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Isolation</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Services run in isolated environments with defined resources</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✅</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Portability</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Deploy anywhere Docker is supported</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MongoDB Details */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🍃 MongoDB Database Design
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📊 Collections Schema
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">tools Collection</h4>
                  <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "id": "docker",
  "name": "Docker",
  "category": "Containerization",
  "description": "Platform for developing...",
  "difficulty": "intermediate",
  "tags": ["containers", "virtualization"]
}`}
                  </pre>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">concepts Collection</h4>
                  <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "id": "docker-basics",
  "toolId": "docker",
  "name": "Docker Fundamentals",
  "difficulty": "beginner",
  "description": "Learn Docker basics...",
  "practiceExercises": [...]
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ⚡ Performance Features
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Indexed queries on id, toolId, difficulty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Text search capabilities on names and descriptions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Aggregation pipelines for statistics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Persistent storage with Docker volumes</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Current Data</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Tools:</span>
                    <span className="font-semibold text-gray-900 dark:text-white ml-2">9</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Concepts:</span>
                    <span className="font-semibold text-gray-900 dark:text-white ml-2">31+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🛠️ API Endpoints
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/tools</code>
                    <span className="text-gray-500 text-sm">All DevOps tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/tools/:id</code>
                    <span className="text-gray-500 text-sm">Specific tool with concepts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/concepts</code>
                    <span className="text-gray-500 text-sm">All learning concepts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/search</code>
                    <span className="text-gray-500 text-sm">Search tools & concepts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/stats</code>
                    <span className="text-gray-500 text-sm">Platform statistics</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Example Response</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "count": 9,
  "data": [
    {
      "id": "docker",
      "name": "Docker",
      "category": "Containerization",
      "description": "Platform for...",
      "difficulty": "intermediate"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🚀 Deployment Strategy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🌐 Frontend (Vercel)
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Automatic deployments from GitHub</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Global CDN distribution</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Static generation & ISR</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Custom domain support</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🐳 Backend (Docker)
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">✓</span>
                  <span>Multi-container orchestration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">✓</span>
                  <span>Persistent data volumes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">✓</span>
                  <span>Health checks & monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">✓</span>
                  <span>Horizontal scaling ready</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            🎓 Learn by Doing
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This platform itself is a practical example of modern DevOps practices in action.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/EmanuelGarciaDev/devops-learning-hub" 
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Source Code
            </a>
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Learning Hub
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
