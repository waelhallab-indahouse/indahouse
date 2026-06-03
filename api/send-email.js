// ============================================================
// INDAHOUSE — Email Notifications via Resend
// File: api/send-email.js (Vercel serverless function)
//
// Setup:
// 1. Go to resend.com → sign up free (3,000 emails/month free)
// 2. Get your API key → add to Vercel env vars as RESEND_API_KEY
// 3. Verify your domain or use Resend's test domain
// ============================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to, type, data } = req.body;

  const templates = {
    // Email to HOST when DJ confirms
    booking_confirmed: {
      subject: `✅ Your DJ confirmed! ${data.djName} is ready for ${data.date}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070D1C;color:#EDF2FB;padding:32px;border-radius:16px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="color:#FF6B1A;font-size:28px;margin:0;">🎧 INDAHOUSE</h1>
            <p style="color:#4A6285;margin-top:6px;">Remote DJ Booking</p>
          </div>
          <h2 style="color:#00D98A;font-size:22px;">Your booking is confirmed! ✅</h2>
          <p style="color:#8DA4BF;line-height:1.7;">
            Great news! <strong style="color:#fff;">${data.djName}</strong> has confirmed your private session.
            Get your speakers ready — it's going to be a great night! 🔊
          </p>
          <div style="background:#0C1528;border:1px solid #182740;border-radius:12px;padding:20px;margin:20px 0;">
            <table style="width:100%;border-collapse:collapse;">
              ${[
                ['DJ', data.djName],
                ['Date', data.date],
                ['Time', data.time],
                ['Duration', data.duration],
                ['Event', data.event],
                ['Total', `$${data.fee}`],
              ].map(([k,v]) => `
                <tr style="border-bottom:1px solid #182740;">
                  <td style="padding:10px 0;color:#4A6285;font-size:13px;">${k}</td>
                  <td style="padding:10px 0;color:#fff;font-weight:700;font-size:13px;text-align:right;">${v}</td>
                </tr>
              `).join('')}
            </table>
          </div>
          <div style="background:#0A1F0E;border:1px solid #00D98A33;border-radius:10px;padding:16px;margin-bottom:20px;">
            <p style="color:#00D98A;font-weight:700;margin:0 0 8px;">🔊 Speaker Setup Tips</p>
            <ul style="color:#8DA4BF;font-size:13px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Connect via Bluetooth, AUX, or Chromecast</li>
              <li>Open Indahouse on your phone at session time</li>
              <li>Hit "Join Session" and turn up the volume!</li>
            </ul>
          </div>
          <a href="https://indahouse-wheat.vercel.app" 
            style="display:block;text-align:center;background:#FF6B1A;color:#000;font-weight:800;padding:14px;border-radius:10px;text-decoration:none;font-size:15px;">
            Open Indahouse →
          </a>
          <p style="color:#4A6285;font-size:12px;text-align:center;margin-top:20px;">
            Indahouse · Remote DJ Booking · <a href="https://indahouse-wheat.vercel.app" style="color:#FF6B1A;">indahouse-wheat.vercel.app</a>
          </p>
        </div>
      `,
    },

    // Email to DJ when new booking request comes in
    new_booking_request: {
      subject: `📥 New booking request — ${data.event} on ${data.date}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070D1C;color:#EDF2FB;padding:32px;border-radius:16px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="color:#FF6B1A;font-size:28px;margin:0;">🎧 INDAHOUSE</h1>
          </div>
          <h2 style="color:#FF6B1A;font-size:22px;">New booking request! 📥</h2>
          <p style="color:#8DA4BF;line-height:1.7;">
            <strong style="color:#fff;">${data.hostName}</strong> wants to book you for a private session.
            Log in to confirm or decline.
          </p>
          <div style="background:#0C1528;border:1px solid #182740;border-radius:12px;padding:20px;margin:20px 0;">
            <table style="width:100%;border-collapse:collapse;">
              ${[
                ['Host', data.hostName],
                ['Date', data.date],
                ['Time', data.time],
                ['Duration', data.duration],
                ['Event', data.event],
                ['Your Earnings', `$${data.fee}`],
              ].map(([k,v]) => `
                <tr style="border-bottom:1px solid #182740;">
                  <td style="padding:10px 0;color:#4A6285;font-size:13px;">${k}</td>
                  <td style="padding:10px 0;color:#fff;font-weight:700;font-size:13px;text-align:right;">${v}</td>
                </tr>
              `).join('')}
            </table>
            ${data.note ? `<p style="color:#8DA4BF;font-size:13px;font-style:italic;margin-top:12px;padding-top:12px;border-top:1px solid #182740;">"${data.note}"</p>` : ''}
          </div>
          <a href="https://indahouse-wheat.vercel.app" 
            style="display:block;text-align:center;background:#FF6B1A;color:#000;font-weight:800;padding:14px;border-radius:10px;text-decoration:none;font-size:15px;">
            View Booking Request →
          </a>
        </div>
      `,
    },

    // Email to HOST when DJ declines
    booking_declined: {
      subject: `❌ Booking update — ${data.djName} is unavailable for ${data.date}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070D1C;color:#EDF2FB;padding:32px;border-radius:16px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="color:#FF6B1A;font-size:28px;margin:0;">🎧 INDAHOUSE</h1>
          </div>
          <h2 style="color:#FF3B5C;font-size:22px;">Booking not available ❌</h2>
          <p style="color:#8DA4BF;line-height:1.7;">
            Unfortunately <strong style="color:#fff;">${data.djName}</strong> is unavailable for ${data.date}.
            Don't worry — browse other amazing DJs and find the perfect match for your party!
          </p>
          <a href="https://indahouse-wheat.vercel.app" 
            style="display:block;text-align:center;background:#FF6B1A;color:#000;font-weight:800;padding:14px;border-radius:10px;text-decoration:none;font-size:15px;">
            Browse Other DJs →
          </a>
        </div>
      `,
    },
  };

  const template = templates[type];
  if (!template) return res.status(400).json({ error: 'Invalid email type' });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Indahouse <noreply@indahouse.app>',  // use your verified domain
        to: [to],
        subject: template.subject,
        html: template.html,
      }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    res.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
}

// ─── HOW TO SET UP RESEND ─────────────────────────────────────────────────────
//
// 1. Go to resend.com → Sign up free
// 2. Go to API Keys → Create API Key
// 3. Copy key → Add to Vercel env vars as: RESEND_API_KEY
// 4. Go to Domains → Add your domain (or use onboarding@resend.dev for testing)
// 5. Save this file as: api/send-email.js in your project
// 6. Deploy → emails will send automatically when DJ confirms/declines
//
// FREE TIER: 3,000 emails/month — plenty for early growth
// ─────────────────────────────────────────────────────────────────────────────
