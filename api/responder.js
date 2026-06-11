export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://respondeavaliacao.smashdocabo.com',
        'X-Title': 'Smash do Cabo'
      },
      body: JSON.stringify({
        model: 'google/gemma-3-4b-it:free',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'ERRO_DEBUG: ' + JSON.stringify(data);
    res.status(200).json({ text });

  } catch (e) {
    res.status(200).json({ text: 'Erro: ' + e.message });
  }
}
