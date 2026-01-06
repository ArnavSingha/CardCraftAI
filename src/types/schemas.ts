// Type definitions for marketing card generation

export interface GenerateMarketingCardInput {
  productName: string;
  category: string;
}

export interface GenerateMarketingCardOutput {
  title: string;
  description: string;
  tags: string[];
}
