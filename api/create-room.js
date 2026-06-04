// ============================================================
// INDAHOUSE — Daily.co Room Creator
// File: api/create-room.js (Vercel serverless function)
// ============================================================

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { roomName } = req.body;
  if (!roomName) return res.status(400).json({ error: 'roomName required' });

  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          max_participants: 10,
          enable_chat: false,
          enable_screenshare: false,
          enable_recording: 'cloud',
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8 hour expiry
          eject_at_room_exp: true,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      // Room might already exist — try to get it
      if (err.error === 'invalid-request-error' && err.info?.includes('already exists')) {
        const getRes = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
          headers: { 'Authorization': `Bearer ${process.env.DAILY_API_KEY}` },
        });
        const room = await getRes.json();
        return res.json({ url: room.url, name: room.name });
      }
      throw new Error(err.info || 'Failed to create room');
    }

    const room = await response.json();
    res.json({ url: room.url, name: room.name });

  } catch (error) {
    console.error('create-room error:', error);
    // Fallback URL — Daily.co will handle auth
    res.json({
      url: `https://indahouse.daily.co/${roomName}`,
      name: roomName,
      fallback: true,
    });
  }
}
