import { Tool, Concept, LearningData } from './schema';
import fs from 'fs';
import path from 'path';

export class DataLoader {
  private static instance: DataLoader;
  private tools: Tool[] = [];
  private concepts: Concept[] = [];
  private dataLoaded = false;

  private constructor() {}

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadData(): Promise<void> {
    if (this.dataLoaded) return;

    try {
      // Load tools
      const toolsDir = path.join(process.cwd(), 'src', 'data', 'tools');
      const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.json'));
      
      this.tools = [];
      for (const file of toolFiles) {
        const toolData = JSON.parse(fs.readFileSync(path.join(toolsDir, file), 'utf-8'));
        this.tools.push(toolData);
      }

      // Load concepts
      const conceptsDir = path.join(process.cwd(), 'src', 'data', 'concepts');
      const conceptFiles = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.json'));
      
      this.concepts = [];
      for (const file of conceptFiles) {
        const conceptData = JSON.parse(fs.readFileSync(path.join(conceptsDir, file), 'utf-8'));
        this.concepts.push(conceptData);
      }

      this.dataLoaded = true;
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  public getAllTools(): Tool[] {
    return this.tools;
  }

  public getTool(id: string): Tool | undefined {
    return this.tools.find(tool => tool.id === id);
  }

  public getConceptsByTool(toolId: string): Concept[] {
    return this.concepts.filter(concept => concept.toolId === toolId);
  }

  public getConcept(id: string): Concept | undefined {
    return this.concepts.find(concept => concept.id === id);
  }

  public getAllConcepts(): Concept[] {
    return this.concepts;
  }

  public searchConcepts(query: string): Concept[] {
    const lowerQuery = query.toLowerCase();
    return this.concepts.filter(concept => 
      concept.name.toLowerCase().includes(lowerQuery) ||
      concept.description.toLowerCase().includes(lowerQuery) ||
      concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

// Static methods for easier usage in Next.js
export const dataLoader = DataLoader.getInstance();

export async function getAllTools(): Promise<Tool[]> {
  await dataLoader.loadData();
  return dataLoader.getAllTools();
}

export async function getTool(id: string): Promise<Tool | undefined> {
  await dataLoader.loadData();
  return dataLoader.getTool(id);
}

export async function getConceptsByTool(toolId: string): Promise<Concept[]> {
  await dataLoader.loadData();
  return dataLoader.getConceptsByTool(toolId);
}

export async function getConcept(id: string): Promise<Concept | undefined> {
  await dataLoader.loadData();
  return dataLoader.getConcept(id);
}
