import type { IncomingMessage, ServerResponse } from 'http';
import { handleAnalyzeRequest } from '../src/utils/analyzeHandler';

// Vercel Serverless Function for POST /api/analyze
export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const prompt = body?.prompt;
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const result = await handleAnalyzeRequest(prompt);
    res.status(200).json(result);
  } catch (error: any) {
    console.error('[Vercel /api/analyze error]', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Failed to process market research request'
    });
  }
}
