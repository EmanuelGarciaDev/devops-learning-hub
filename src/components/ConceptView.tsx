"use client";

import { useState } from "react";
import Link from "next/link";
import { Concept } from "@/data/schema";

interface ConceptViewProps {
  concept: Concept;
}

export default function ConceptView({ concept }: ConceptViewProps) {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link 
              href={`/tools/${concept.toolId}`} 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {concept.toolId}
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">{concept.name}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              {concept.name}
            </h1>
            <span className={`px-3 py-1 text-sm rounded-full ${
              concept.difficulty === 'beginner' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : concept.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {concept.difficulty}
            </span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {concept.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Definition Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Definition
            </h2>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!isAdvanced ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                Beginner
              </span>
              <button
                onClick={() => setIsAdvanced(!isAdvanced)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAdvanced ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAdvanced ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAdvanced ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                Advanced
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {isAdvanced ? concept.definitions.advanced : concept.definitions.beginner}
          </p>
        </div>

        {/* Commands Section */}
        {concept.commands.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Command Reference
            </h2>
            
            <div className="space-y-4">
              {concept.commands.map((cmd, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm font-mono">
                      {cmd.command}
                    </code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {cmd.description}
                  </p>
                  {cmd.example && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
                      <code className="text-green-600 dark:text-green-400">
                        $ {cmd.example}
                      </code>
                    </div>
                  )}
                  {cmd.flags && cmd.flags.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Common flags:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cmd.flags.map((flag, flagIndex) => (
                          <div key={flagIndex} className="text-xs">
                            <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                              {flag.flag}
                            </code>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">
                              {flag.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples Section */}
        {concept.examples.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Real-World Examples
            </h2>
            
            <div className="space-y-6">
              {concept.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {example.description}
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                    Scenario: {example.scenario}
                  </div>
                  
                  {example.code && (
                    <div className="bg-gray-900 rounded-lg p-4 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">
                          {example.language || 'code'}
                        </span>
                      </div>
                      <pre className="text-sm text-gray-100 overflow-x-auto">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {example.output && (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Output:</p>
                      <pre className="text-sm text-gray-700 dark:text-gray-300">
                        {example.output}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
