export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const data = await request.json();
    const { project_type, location, name, phone, details } = data;

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured in Cloudflare environment variables.' }), { 
        status: 500,
        headers: corsHeaders 
      });
    }

    // Call Resend API
    // Note: 'from' should eventually be a verified domain in Resend for production use.
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Filcan Pride Website <onboarding@resend.dev>',
        to: ['traderisemarketing@outlook.com'],
        reply_to: name ? `${name} <${phone}@no-email.com>` : 'no-reply@resend.dev',
        subject: `New Lead: ${name || 'Inquiry'} - ${project_type || 'General'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #BA1B1B; border-bottom: 2px solid #BA1B1B; padding-bottom: 10px;">New Project Inquiry</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Project Type:</strong> ${project_type}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p><strong>Details:</strong></p>
              <p>${details}</p>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
              This inquiry was sent from the Filcan Pride Painting Ltd contact form.
            </p>
          </div>
        `,
      }),
    });

    const result = await resendResponse.json();

    if (resendResponse.ok) {
      return new Response(JSON.stringify({ success: true, id: result.id }), { 
        status: 200,
        headers: corsHeaders 
      });
    } else {
      console.error('Resend Error:', result);
      return new Response(JSON.stringify({ error: result.message || 'Failed to send email' }), { 
        status: resendResponse.status,
        headers: corsHeaders 
      });
    }

  } catch (err) {
    console.error('Server Catch Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: corsHeaders 
    });
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
