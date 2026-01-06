# CardCraft AI

A React application for generating AI-powered marketing cards for products. Enter a product name and category, and let AI craft compelling marketing content including catchy titles, persuasive descriptions, and relevant keyword tags.

![CardCraft AI](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🌐 Live Demo

> 🔗 **[View Live Demo](https://cardcraftai0.netlify.app/)** <!-- Replace with your actual deployment URL -->

## ✨ Features

- 🤖 **AI-Generated Marketing Content** - Powered by Google Gemini AI
- 🎨 **Catchy Titles** - Creative, attention-grabbing product titles
- 📝 **Persuasive Descriptions** - Compelling marketing copy that sells
- 🏷️ **Smart Keyword Tags** - Automatically generated SEO-friendly tags
- 🔄 **Unlimited Regenerations** - Not satisfied? Regenerate with one click
- 🌙 **Dark/Light Theme** - Beautiful UI with theme toggle (dark by default)
- ⚡ **Smooth Animations** - Polished UI with engaging micro-interactions
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🎯 Where AI is Used

### Google Gemini AI (via Genkit)

The application uses **Google's Gemini 2.0 Flash** model through the Genkit framework for:

| Feature | AI Usage | Location |
|---------|----------|----------|
| **Title Generation** | Gemini generates creative, marketing-focused product titles based on product name and category | `server/flows/generate-marketing-card.ts` |
| **Description Writing** | AI crafts persuasive, benefit-driven product descriptions | `server/flows/generate-marketing-card.ts` |
| **Keyword Tagging** | Intelligent extraction of relevant SEO keywords and tags | `server/flows/generate-marketing-card.ts` |

### AI Prompt Engineering

The AI is instructed with specific guidelines to:
- Create concise, impactful titles (under 10 words)
- Write descriptions highlighting key features and benefits
- Generate 3-5 relevant, searchable keywords
- Adapt tone based on product category

## 🎨 Design Choices

### Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **React + Vite** | Fast HMR, modern build tooling, excellent DX |
| **Express Backend** | Simple, lightweight API server for AI integration |
| **Genkit Framework** | Google's official AI framework with type-safe flows |
| **TypeScript Throughout** | End-to-end type safety for reliability |
| **Tailwind CSS** | Utility-first styling for rapid UI development |

### UI/UX Design Philosophy

1. **Dark Theme Default**: Chosen for reduced eye strain and modern aesthetic appeal
2. **Floating Animations**: Subtle background animations create depth without distraction
3. **Micro-interactions**: Every element responds to user interaction (hover, focus, click)
4. **Progressive Disclosure**: Form → Loading → Result flow guides users naturally
5. **Accessibility First**: Radix UI primitives ensure keyboard navigation and screen reader support

### Animation Strategy

| Element | Animation | Purpose |
|---------|-----------|---------|
| Background | Floating blurred circles | Creates depth and visual interest |
| Inputs | Gradient border glow + sparkles | Draws attention, indicates focus |
| Dropdowns | Rotating chevron + backdrop blur | Smooth, polished interactions |
| Buttons | Gradient shimmer + scale | Clear call-to-action feedback |
| Cards | Fade-in + hover lift | Content hierarchy and interactivity |
| Tags | Shimmer sweep + glow pulse | Highlights generated keywords |

### Component Architecture

```
src/components/
├── card-craft-client.tsx   # Main form + state management
├── product-card.tsx        # Generated card display
├── card-skeleton.tsx       # Loading state
└── ui/                     # Reusable primitives
    ├── button.tsx          # Animated button variants
    ├── input.tsx           # Enhanced input with animations
    ├── select.tsx          # Custom dropdown with effects
    ├── card.tsx            # Card container
    └── ...                 # Other UI components
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Google AI API key (for Genkit/Gemini)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root directory:

```env
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

> 💡 Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 3. Run the development server

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:9002 (Vite React app)
- **Backend**: http://localhost:3001 (Express API server)

## 📁 Project Structure

```
├── src/                      # Frontend React application
│   ├── api/                  # API client for backend communication
│   ├── components/           # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui style)
│   │   ├── card-craft-client.tsx  # Main form component
│   │   ├── card-skeleton.tsx      # Loading skeleton
│   │   └── product-card.tsx       # Result card display
│   ├── hooks/                # Custom React hooks (toast, theme)
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript type definitions & Zod schemas
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles & animations
├── server/                   # Backend Express server
│   ├── flows/                # Genkit AI flows
│   │   └── generate-marketing-card.ts  # AI content generation
│   ├── genkit.ts             # Genkit configuration
│   └── index.ts              # Express server entry point
├── package.json
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:client` | Start only the Vite frontend |
| `npm run dev:server` | Start only the Express backend |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Hook Form + Zod** - Form validation

### Backend
- **Express.js** - Minimal Node.js server
- **Genkit** - Google's AI framework
- **Google Gemini 2.0 Flash** - AI model for content generation

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/generate-marketing-card` | POST | Generate title, description, and tags |

### Request Example

```json
POST /api/generate-marketing-card
{
  "productName": "Wireless Earbuds",
  "category": "Electronics"
}
```

### Response Example

```json
{
  "title": "Experience Pure Sound Freedom",
  "description": "Immerse yourself in crystal-clear audio with our premium wireless earbuds. Featuring advanced noise cancellation and 24-hour battery life.",
  "keywords": ["wireless", "earbuds", "bluetooth", "noise-cancelling", "premium-audio"]
}
```

## 🎨 Customization

### Adding New Categories

Edit the categories array in `src/components/card-craft-client.tsx`:

```typescript
const categories = [
  "Automotive",
  "Beauty & Personal Care",
  // Add your category here
];
```

### Modifying AI Behavior

Edit the prompt in `server/flows/generate-marketing-card.ts` to customize:
- Title style and length
- Description tone and format
- Number of keywords generated

## 📄 License

MIT

---

<p align="center">
  Built with ❤️ using React, Genkit, and Google Gemini AI
</p>
