# 🚀 DevOps Learning Hub

A comprehensive, modular learning and reference platform for DevOps and cloud technologies built with Next.js and TailwindCSS.

![DevOps Learning Hub](https://img.shields.io/badge/DevOps-Learning%20Hub-blue?style=for-the-badge&logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat&logo=tailwind-css)

## 🎯 Overview

This platform provides a **complete DevOps learning journey** from beginner to advanced, covering the entire modern DevOps ecosystem with hands-on examples, command references, and real-world scenarios.

## ✨ Features

### 🏠 **Home Page**
- Grid layout showcasing all available DevOps tools
- Dynamic stats showing tools, concepts, and coverage
- Responsive design optimized for all devices

### 🛠️ **Tool Pages** 
- Comprehensive tool overviews (`/tools/docker`, `/tools/aws`, etc.)
- Key concepts and learning paths for each tool
- Category-based organization

### 📚 **Concept Pages**
- **Dual explanations**: Beginner & advanced definitions with toggle
- **Command cheat sheets**: Complete with flags, examples, and descriptions
- **Real-world examples**: Production-ready code snippets and scenarios
- **Hands-on labs**: Copy-paste ready configurations

### 🎨 **Design**
- **Clean, learning-first UI** prioritizing readability
- **Dark mode support** for comfortable learning
- **Mobile-friendly** responsive design
- **Visual hierarchy** with proper typography and spacing

## 🛠️ Tools Covered

| Tool | Category | Concepts | Description |
|------|----------|----------|-------------|
| 🐳 **Docker** | Containerization | 3 concepts | Platform for developing, shipping, and running applications |
| ☁️ **AWS** | Cloud Platform | 4 concepts | Amazon Web Services cloud computing platform |
| ⚙️ **Kubernetes** | Container Orchestration | 4 concepts | Open-source container orchestration platform |
| 🏗️ **Terraform** | Infrastructure as Code | 4 concepts | Infrastructure as Code tool for cloud resources |
| 🔧 **Jenkins** | CI/CD | 4 concepts | Open-source automation server for DevOps pipelines |
| 🎭 **Ansible** | Configuration Management | 4 concepts | Agentless automation platform |
| 📊 **Prometheus** | Monitoring & Observability | 4 concepts | Open-source monitoring and alerting toolkit |

## 📖 Learning Concepts (23 Total)

### 🐳 Docker (3 concepts)
- **Docker Basics**: Fundamentals and core concepts
- **Docker Images**: Building, managing, and optimizing images
- **Docker Containers**: Container lifecycle and management

### ☁️ AWS (4 concepts)
- **AWS Fundamentals**: Core AWS concepts and CLI setup
- **EC2 Instances**: Virtual servers and compute management
- **S3 Storage**: Object storage and file operations
- **IAM Security**: Identity and access management

### ⚙️ Kubernetes (4 concepts)
- **Kubernetes Fundamentals**: Cluster basics and architecture
- **Pods & Deployments**: Container management and scaling
- **Services & Networking**: Service discovery and ingress
- **ConfigMaps & Secrets**: Configuration and security management

### 🏗️ Terraform (4 concepts)
- **Terraform Fundamentals**: Infrastructure as Code basics
- **Providers & Resources**: Multi-cloud resource management
- **State Management**: Remote backends and collaboration
- **Modules & Workspaces**: Reusable code and environments

### 🔧 Jenkins (4 concepts)
- **Jenkins Fundamentals**: CI/CD automation basics
- **Pipelines**: Declarative and scripted pipeline creation
- **Build Automation**: Automated testing and deployment
- **Plugins & Integrations**: Ecosystem and tool integration

### 🎭 Ansible (4 concepts)
- **Ansible Fundamentals**: Agentless automation basics
- **Playbooks**: Infrastructure automation and configuration
- **Inventory Management**: Server organization and grouping
- **Roles & Collections**: Reusable automation components

### 📊 Prometheus (4 concepts)
- **Prometheus Fundamentals**: Metrics collection and monitoring
- **Metrics & Queries**: PromQL and data analysis
- **Grafana Integration**: Visualization and dashboards
- **Alertmanager**: Alert rules and notification management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EmanuelGarciaDev/devops-learning-hub.git
   cd devops-learning-hub
   ```

### 🌐 Live Demo
**[👉 View Live Application](https://devops-learning-dozut7vfx-emanuelgarciadevs-projects.vercel.app)**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── concepts/[conceptId]/  # Dynamic concept pages
│   │   ├── tools/[toolId]/        # Dynamic tool pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   └── ConceptView.tsx     # Concept detail component
│   └── data/                   # Content and data
│       ├── concepts/           # JSON concept definitions
│       ├── tools/              # JSON tool definitions
│       ├── loader.ts           # Data loading utilities
│       └── schema.ts           # TypeScript interfaces
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 📊 Data Structure

### Tool Schema
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  concepts: string[];
}
```

### Concept Schema
```typescript
interface Concept {
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
```

## 🎯 Learning Paths

### 🟢 **Beginner Path**
1. Start with **Docker Basics** (containerization fundamentals)
2. Learn **AWS Fundamentals** (cloud computing basics)
3. Explore **Terraform Fundamentals** (infrastructure as code)
4. Practice **Jenkins Basics** (automation introduction)

### 🟡 **Intermediate Path**
1. **Kubernetes Fundamentals** → **Pods & Deployments**
2. **AWS EC2** → **S3 Storage** → **IAM Security**
3. **Terraform Providers** → **State Management**
4. **Ansible Fundamentals** → **Playbooks**

### 🔴 **Advanced Path**
1. **Kubernetes Services** → **ConfigMaps & Secrets**
2. **Terraform Modules** → **Workspaces**
3. **Jenkins Pipelines** → **Build Automation**
4. **Prometheus Monitoring** → **Grafana Integration**

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Adding New Tools
1. Create tool JSON in `src/data/tools/`
2. Add concept JSON files in `src/data/concepts/`
3. Follow existing schema and structure

### Adding New Concepts
1. Create concept JSON in `src/data/concepts/`
2. Include beginner/advanced definitions
3. Add practical commands and examples
4. Reference it in the tool's concepts array

### Improving Content
- Fix typos or improve explanations
- Add more real-world examples
- Enhance command references
- Update outdated information

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/)
- Icons and emojis for visual enhancement
- Community feedback and contributions

---

**Happy Learning! 🚀** Start your DevOps journey at [http://localhost:3000](http://localhost:3000)
