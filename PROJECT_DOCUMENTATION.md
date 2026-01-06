# CardCraftAI - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [API Documentation](#api-documentation)
7. [Deployment to Netlify](#deployment-to-netlify)
8. [Environment Variables](#environment-variables)
9. [How It Works](#how-it-works)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**CardCraftAI** is a full-stack web application that uses Google's Gemini AI to automatically generate marketing content for products. Users input a product name and category, and the AI generates:

- **Catchy Title**: An engaging product title
- **Description**: A concise 2-sentence product description
- **Tags**: 5 relevant keyword tags for marketing/SEO

### Key Features
- 🤖 AI-powered content generation using Google Gemini 2.5 Flash
- ⚡ Fast, serverless architecture with Netlify Functions
- 🎨 Modern UI built with React, TypeScript, and Tailwind CSS
- 📱 Fully responsive design
- 🔄 Real-time loading states with skeleton UI

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React + TypeScript Frontend                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Form UI   │  │ Product Card│  │  Toast Notifs   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP POST /api/generate-marketing-card
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NETLIFY EDGE NETWORK                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Static File Hosting                    │   │
│  │              (HTML, CSS, JS from /dist)                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Netlify Serverless Function                 │   │
│  │                  /api/* → api.ts                         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ API Request
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GOOGLE GEMINI AI API                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Gemini 2.5 Flash Model                      │   │
│  │         Generates marketing content via Genkit           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow
1. User enters product name and category in the form
2. Frontend sends POST request to `/api/generate-marketing-card`
3. Netlify redirects request to the serverless function
4. Function uses Genkit to call Google Gemini AI
5. AI generates structured JSON response
6. Response is returned to frontend
7. UI displays the generated marketing card

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Shadcn/UI** | Pre-built accessible UI components |
| **Zod** | Runtime schema validation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Netlify Functions** | Serverless API endpoints |
| **Genkit** | AI orchestration framework |
| **Google Gemini 2.5 Flash** | Large Language Model |
| **TypeScript** | Type-safe server code |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Netlify** | Hosting & CI/CD |
| **Git/GitHub** | Version control |
| **ESBuild** | Function bundling |

---

## 📁 Project Structure

```
CardCraftAI/
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies & scripts
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript config (main)
├── 📄 tsconfig.node.json      # TypeScript config (Node/Vite)
├── 📄 netlify.toml            # Netlify deployment config
├── 📄 .env                    # Environment variables (local)
│
├── 📁 netlify/
│   └── 📁 functions/
│       └── 📄 api.ts          # Serverless API function
│
├── 📁 server/                 # Local development server (optional)
│   ├── 📄 index.ts
│   ├── 📄 genkit.ts
│   └── 📁 flows/
│       └── 📄 generate-marketing-card.ts
│
└── 📁 src/
    ├── 📄 App.tsx             # Root React component
    ├── 📄 main.tsx            # React entry point
    ├── 📄 index.css           # Global styles + Tailwind
    │
    ├── 📁 api/
    │   └── 📄 client.ts       # API client functions
    │
    ├── 📁 components/
    │   ├── 📄 card-craft-client.tsx  # Main app component
    │   ├── 📄 product-card.tsx       # Generated card display
    │   ├── 📄 card-skeleton.tsx      # Loading skeleton
    │   └── 📁 ui/                    # Shadcn UI components
    │       ├── 📄 button.tsx
    │       ├── 📄 card.tsx
    │       ├── 📄 form.tsx
    │       ├── 📄 input.tsx
    │       └── ... (other UI components)
    │
    ├── 📁 hooks/
    │   ├── 📄 use-theme.ts    # Theme management
    │   └── 📄 use-toast.ts    # Toast notifications
    │
    ├── 📁 lib/
    │   └── 📄 utils.ts        # Utility functions (cn)
    │
    └── 📁 types/
        └── 📄 schemas.ts      # TypeScript type definitions
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google AI API key (from Google AI Studio)
- Git installed
- Netlify account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArnavSingha/CardCraftAI.git
   cd CardCraftAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in project root
   echo "GOOGLE_GENAI_API_KEY=your_api_key_here" > .env
   ```

4. **Start development server**
   ```bash
   # Start frontend only
   npm run dev
   
   # Or start with Netlify Functions
   npx netlify dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173  (Vite dev server)
   http://localhost:8888  (Netlify dev)
   ```

---

## 📡 API Documentation

### Generate Marketing Card

**Endpoint:** `POST /api/generate-marketing-card`

**Description:** Generates AI-powered marketing content for a product.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "productName": "string (required)",
  "category": "string (required)"
}
```

**Example Request:**
```json
{
  "productName": "AirPods Pro",
  "category": "Electronics"
}
```

#### Response

**Success (200 OK):**
```json
{
  "title": "AirPods Pro: Immerse Yourself in Sound",
  "description": "Experience audio like never before with active noise cancellation and spatial audio. These premium wireless earbuds deliver crystal-clear sound in a compact, comfortable design.",
  "tags": ["wireless earbuds", "noise cancellation", "Apple", "premium audio", "Bluetooth"]
}
```

**Error (400 Bad Request):**
```json
{
  "error": "productName and category are required"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to generate marketing card"
}
```

### Health Check

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok"
}
```

---

## 🚀 Deployment to Netlify

### Method 1: Git Integration (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

4. **Add environment variable**
   - Go to Site settings → Environment variables
   - Add: `GOOGLE_GENAI_API_KEY` = `your_api_key`

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### Netlify Configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENAI_API_KEY` | Google AI Studio API key | Yes |

### Getting a Google AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add to Netlify environment variables

---

## 🔄 How It Works

### 1. User Input Flow
```
User fills form → Validates input → Sends to API
```

### 2. AI Processing Flow
```typescript
// Genkit Flow Definition
const generateMarketingCardFlow = ai.defineFlow(
  {
    name: 'generateMarketingCardFlow',
    inputSchema: z.object({
      productName: z.string(),
      category: z.string(),
    }),
    outputSchema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
  },
  async (input) => {
    const { output } = await generateMarketingCardPrompt(input);
    return output;
  }
);
```

### 3. AI Prompt
```
Act as a marketing expert. Generate a catchy Title, 
a short Description (max 2 sentences), and 5 keywords 
tags for the product named "{productName}" in the 
category of "{category}". Return ONLY raw JSON with 
keys: 'title', 'description', 'tags'. Do not use Markdown.
```

### 4. Response Flow
```
AI Response → Validate Schema → Format JSON → Return to Client
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "Failed to generate marketing card" Error
**Causes:**
- Missing or invalid API key
- API rate limiting
- Network issues

**Solutions:**
- Verify `GOOGLE_GENAI_API_KEY` is set in Netlify
- Check Netlify function logs for details
- Ensure API key is valid and has quota

#### 2. 404 Error on API Calls
**Causes:**
- Redirect rules not configured
- Function not deployed

**Solutions:**
- Verify `netlify.toml` has correct redirects
- Check that functions are in `netlify/functions` directory
- Redeploy with "Clear cache and deploy"

#### 3. CORS Errors
**Causes:**
- Missing CORS headers

**Solutions:**
- The API function includes CORS headers by default
- Check browser console for specific error

#### 4. Build Failures
**Causes:**
- TypeScript errors
- Missing dependencies

**Solutions:**
- Run `npm run build` locally to check for errors
- Ensure all dependencies are in `package.json`

### Checking Logs

**Netlify Dashboard:**
1. Go to your site → Logs → Functions
2. Find `api` function
3. View invocation logs

**Local Development:**
```bash
npx netlify dev --debug
```

---

## 📊 Performance Considerations

- **Cold Start:** First function invocation may take 1-2 seconds
- **AI Response Time:** Gemini typically responds in 1-3 seconds
- **Caching:** Consider implementing response caching for repeated queries

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Arnav Singha**
- GitHub: [@ArnavSingha](https://github.com/ArnavSingha)

---

*Documentation generated for CardCraftAI v1.0*
*Last updated: January 2026*
