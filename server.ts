import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAnalyzeRequest } from './src/utils/analyzeHandler';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Status & Configuration Endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  const hasGroqKey = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim().length > 0);
  res.json({
    status: 'ONLINE',
    port: PORT,
    gateA: {
      name: 'GATE A (Pakistan Local Cache)',
      status: 'ACTIVE',
      latency: '< 50ms',
      records: 'Preloaded Pakistan Logistics, FinTech, & Trade Indices'
    },
    gateB: {
      name: 'GATE B (Groq LLaMA-3 Global Engine)',
      model: 'llama3-70b-8192',
      hasApiKey: hasGroqKey,
      status: hasGroqKey ? 'LIVE_READY' : 'SIMULATION_READY'
    }
  });
});

// Dual-Engine Core Analysis Handler
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const result = await handleAnalyzeRequest(prompt);
  res.json(result);
});

// Static / Vite Mounting
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MarketMind Analyst Server] Running on http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('[MarketMind Server Error]', err);
  process.exit(1);
});
