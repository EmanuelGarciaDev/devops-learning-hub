import Link from "next/link";
import { getAllTools } from "@/data/loader";

export default async function Home() {
  const tools = await getAllTools();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            DevOps Learning Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master DevOps and cloud technologies with comprehensive guides, 
            command references, and real-world examples.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3" role="img" aria-label={tool.name}>
                    {tool.icon}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                  <span>Explore {tool.concepts.length} concepts</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Complete DevOps Learning Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {tools.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                DevOps Tools
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {tools.reduce((acc, tool) => acc + tool.concepts.length, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Learning Concepts
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Hands-on Examples
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
