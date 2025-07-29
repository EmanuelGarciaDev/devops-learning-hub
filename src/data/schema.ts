// TypeScript interfaces for our DevOps learning content

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  color?: string;
  concepts: string[]; // Array of concept IDs
}

export interface Concept {
  id: string;
  toolId: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  definitions: {
    beginner: string;
    advanced: string;
  };
  commands: Command[];
  examples: Example[];
  tags: string[];
}

export interface Command {
  command: string;
  description: string;
  example?: string;
  flags?: Flag[];
}

export interface Flag {
  flag: string;
  description: string;
  example?: string;
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  language?: string;
  output?: string;
  scenario: string;
}

export interface LearningData {
  tools: Tool[];
  concepts: Concept[];
}
