import { z } from 'genkit';
import { ai } from '../genkit';

// Define the input schema
const GenerateMarketingCardInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product.'),
});

// Define the output schema
const GenerateMarketingCardOutputSchema = z.object({
  title: z.string().describe('A catchy title for the product.'),
  description: z.string().describe('A short description (max 2 sentences) of the product.'),
  tags: z.array(z.string()).describe('An array of 5 keyword tags for the product.'),
});

type GenerateMarketingCardInput = z.infer<typeof GenerateMarketingCardInputSchema>;
type GenerateMarketingCardOutput = z.infer<typeof GenerateMarketingCardOutputSchema>;

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

// Wrapper function
export async function generateMarketingCard(
  input: GenerateMarketingCardInput
): Promise<GenerateMarketingCardOutput> {
  return generateMarketingCardFlow(input);
}
