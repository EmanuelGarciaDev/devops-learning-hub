# DevOps Learning Hub

A modular learning and reference tool for DevOps and cloud technologies built with Next.js and TailwindCSS.

## Features

- **Home page** with grid of available tools
- **Tool pages** (/docker, /aws, etc.) listing key concepts
- **Concept pages** with:
  - Beginner & advanced definitions
  - Command cheat sheets with flags
  - Real-world examples with code
  - Toggle between beginner/advanced explanations
- **JSON-based content** for easy expansion
- **Responsive design** optimized for mobile and desktop
- **Dark mode support**

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── tools/[toolId]/    # Dynamic tool pages
│   └── concepts/[conceptId]/ # Dynamic concept pages
├── components/            # React components
│   └── ConceptView.tsx   # Main concept display component
└── data/                 # JSON content and utilities
    ├── schema.ts         # TypeScript interfaces
    ├── loader.ts         # Data loading utilities
    ├── tools/           # Tool definitions (JSON)
    └── concepts/        # Concept definitions (JSON)
```

## Adding New Content

### Adding a New Tool

1. Create a JSON file in `src/data/tools/[tool-name].json`:
   ```json
   {
     "id": "tool-name",
     "name": "Tool Name",
     "description": "Tool description",
     "category": "Category",
     "icon": "🔧",
     "color": "blue",
     "concepts": ["concept-1", "concept-2"]
   }
   ```

### Adding a New Concept

1. Create a JSON file in `src/data/concepts/[concept-name].json`:
   ```json
   {
     "id": "concept-name",
     "toolId": "tool-name",
     "name": "Concept Name",
     "description": "Brief description",
     "difficulty": "beginner",
     "definitions": {
       "beginner": "Simple explanation",
       "advanced": "Detailed technical explanation"
     },
     "commands": [...],
     "examples": [...],
     "tags": ["tag1", "tag2"]
   }
   ```

## Current Tools

- **Docker** - Containerization platform with 3 concepts:
  - Docker Basics (beginner)
  - Docker Images (intermediate) 
  - Docker Containers (intermediate)

## Roadmap

- [ ] AWS concepts and commands
- [ ] Kubernetes fundamentals
- [ ] Terraform infrastructure as code
- [ ] Jenkins CI/CD
- [ ] Search functionality
- [ ] Interactive diagrams
- [ ] Progress tracking
- [ ] Bookmark/favorites system

## Deployment

This app is configured for deployment on Vercel:

1. **Push to GitHub repository**
2. **Connect repository to Vercel**
3. **Deploy automatically** on every push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **TailwindCSS** - Utility-first CSS framework
- **Vercel** - Deployment and hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add new tools/concepts following the JSON schema
4. Submit a pull request

## License

MIT License - see LICENSE file for details
