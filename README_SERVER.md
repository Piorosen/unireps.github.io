# UniReps Blogpost Submission Repository

Welcome to the **UniReps Blogpost Submission** repository! Here you can submit blogposts to be published on our website. Share your insights, early-stage research, tutorials, and opinions on topics related to neuroscience and AI, fostering interdisciplinary discussions.

## Why Submit a Blogpost?

Blogposts provide a flexible format for communicating ideas that may not fit into a traditional research paper. You can:
- Share **new research** or early-stage findings.
- Provide **tutorial-style** summaries of key methods and literature.
- Present **opinion pieces** on topics within the [workshop interests](https://unireps.org/2024/).

Once accepted, your blogpost will be featured on our website and promoted on [social media](https://x.com/unireps). You'll also have the opportunity to present your post at the UniReps Workshop!

## How to Submit

The official guidelines for submitting a blogpost can be found [here](https://unireps.org/blog/2024/guidelines). In summary, you should:
1. Fork this repository.
2. Create a new folder with the title of your blogpost.
3. Add your blogpost with as many images, figures, and code snippets as you like. The more engaging, the better!
4. Submit a pull request to the main repository.
5. Wait for feedback from the UniReps team.
6. Once accepted, your blogpost will be published on our website!

## Development & Server Setup

This repository includes both Jekyll-based static site generation and a Node.js server for enhanced functionality.

### Quick Start

#### Using Docker (Recommended)
```bash
# Start the Jekyll development server
docker compose up -d

# View logs
docker compose logs -f

# Stop the server
docker compose down
```

#### Using Node.js Server
```bash
# Install dependencies
npm install
bundle install

# Development mode (proxies to Jekyll)
npm run dev

# Production mode (serves static files)
NODE_ENV=production npm start

# Build static files
npm run build
```

### Server Features

- **Health Check**: `GET /health` - Server status and diagnostics
- **API Info**: `GET /api/info` - Server information
- **Development Proxy**: Automatically proxies to Jekyll server with live reload
- **Production Static**: Serves built Jekyll files in production
- **Error Handling**: Robust error handling and logging

### Package Publishing

This repository is configured as an npm package that can be published:

```bash
# Build and publish
npm run prepublishOnly
npm publish
```

## Community and Support

Need help? Join our [Discord community](https://discord.gg/XdeamXWsFE) or consult the [submission guide](https://unireps.org/blog/2024/guidelines) for more information.

We look forward to your contributions!