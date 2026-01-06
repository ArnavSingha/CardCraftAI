import type { Context } from '@netlify/functions';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';

// Initialize Genkit AI
const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

// Define schemas
const GenerateMarketingCardInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product.'),
});

const GenerateMarketingCardOutputSchema = z.object({
  title: z.string().describe('A catchy title for the product.'),
  description: z.string().describe('A short description (max 2 sentences) of the product.'),
  tags: z.array(z.string()).describe('An array of 5 keyword tags for the product.'),
});

// Define the prompt
const generateMarketingCardPrompt = ai.definePrompt({
  name: 'generateMarketingCardPrompt',
  input: { schema: GenerateMarketingCardInputSchema },
  output: { schema: GenerateMarketingCardOutputSchema },
  prompt: `Act as a marketing expert. Generate a catchy Title, a short Description (max 2 sentences), and 5 keywords tags for the product named "{{{productName}}}" in the category of "{{{category}}}". Return ONLY raw JSON with keys: 'title', 'description', 'tags'. Do not use Markdown.`,
});

// Define the flow
const generateMarketingCardFlow = ai.defineFlow(
  {
    name: 'generateMarketingCardFlow',
    inputSchema: GenerateMarketingCardInputSchema,
    outputSchema: GenerateMarketingCardOutputSchema,
  },
  async (input) => {
    const { output } = await generateMarketingCardPrompt(input);
    return output!;
  }
);

// Netlify Function handler
export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace('/.netlify/functions/api', '');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Health check endpoint
  if (path === '/health' && req.method === 'GET') {
    return new Response(JSON.stringify({ status: 'ok' }), { headers });
  }

  // Generate marketing card endpoint
  if (path === '/generate-marketing-card' && req.method === 'POST') {
    try {
      const body = await req.json();
      const { productName, category } = body;

      if (!productName || !category) {
        return new Response(
          JSON.stringify({ error: 'productName and category are required' }),
          { status: 400, headers }
        );
      }

      const result = await generateMarketingCardFlow({ productName, category });
      return new Response(JSON.stringify(result), { headers });
    } catch (error) {
      console.error('Error generating marketing card:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate marketing card' }),
        { status: 500, headers }
      );
    }
  }

  // 404 for unknown routes
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers,
  });
};
