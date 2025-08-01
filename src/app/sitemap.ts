import { MetadataRoute } from 'next';
import { getAllTools, getAllConcepts } from '@/data/loader';
import { Tool, Concept } from '@/data/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, concepts] = await Promise.all([getAllTools(), getAllConcepts()]);
  const baseUrl = 'https://devops-learning-hub.vercel.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool: Tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic concept pages
  const conceptPages: MetadataRoute.Sitemap = concepts.map((concept: Concept) => ({
    url: `${baseUrl}/concepts/${concept.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...conceptPages];
}
