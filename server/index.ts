import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { generateMarketingCard } from './flows/generate-marketing-card';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Generate marketing card endpoint
app.post('/api/generate-marketing-card', async (req, res) => {
  try {
    const { productName, category } = req.body;
    
    if (!productName || !category) {
      return res.status(400).json({ error: 'productName and category are required' });
    }

    const result = await generateMarketingCard({ productName, category });
    res.json(result);
  } catch (error) {
    console.error('Error generating marketing card:', error);
    res.status(500).json({ error: 'Failed to generate marketing card' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
