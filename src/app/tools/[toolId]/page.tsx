import Link from "next/link";
import { getTool, getConceptsByTool } from "@/data/loader";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ toolId: string }>;
}

export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = await getTool(toolId);
  
  if (!tool) {
    notFound();
  }

  const concepts = await getConceptsByTool(toolId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl mr-4" role="img" aria-label={tool.name}>
              {tool.icon}
            </span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                {tool.name}
              </h1>
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {tool.category}
              </span>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
            Explore {tool.name} Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept) => (
              <Link
                key={concept.id}
                href={`/concepts/${concept.id}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {concept.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      concept.difficulty === 'beginner' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : concept.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {concept.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {concept.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {concept.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {concept.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{concept.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{concept.commands.length} commands</span>
                    <span>{concept.examples.length} examples</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
