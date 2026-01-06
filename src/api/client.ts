import type {
  GenerateMarketingCardInput,
  GenerateMarketingCardOutput,
} from '@/types/schemas';

const API_BASE_URL = '/api';

export async function generateMarketingCard(
  input: GenerateMarketingCardInput
): Promise<GenerateMarketingCardOutput> {
  const response = await fetch(`${API_BASE_URL}/generate-marketing-card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to generate marketing card');
  }

  return response.json();
}
