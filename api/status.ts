// Vercel Serverless Function for GET /api/status
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const hasGroqKey = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim().length > 0);
  res.status(200).json({
    status: 'ONLINE',
    environment: 'vercel_serverless',
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
}
