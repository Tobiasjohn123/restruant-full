import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { booking } = await req.json();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #0a0908; color: #fff8eb; font-family: Georgia, serif; margin: 0; padding: 0; }
        .container { max-width: 520px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 32px; }
        .logo { font-size: 28px; color: #C8A96A; letter-spacing: 0.04em; }
        .tagline { font-size: 12px; color: rgba(255,248,235,0.5); letter-spacing: 0.2em; text-transform: uppercase; margin-top: 4px; }
        .ticket { background: rgba(255,255,255,0.04); border: 1px solid rgba(200,169,106,0.2); border-radius: 16px; padding: 32px; margin-bottom: 24px; }
        .ticket-title { font-size: 22px; color: #C8A96A; margin-bottom: 24px; text-align: center; }
        .divider { border: none; border-top: 1px dashed rgba(200,169,106,0.3); margin: 20px 0; }
        .row { display: flex; justify-content: space-between; margin-bottom: 14px; }
        .label { color: rgba(255,248,235,0.5); font-size: 13px; }
        .value { color: #fff8eb; font-size: 13px; font-weight: bold; }
        .booking-id { text-align: center; font-size: 20px; color: #C8A96A; letter-spacing: 0.1em; margin: 16px 0; }
        .footer { text-align: center; color: rgba(255,248,235,0.3); font-size: 11px; margin-top: 32px; }
        .note { background: rgba(200,169,106,0.08); border-left: 3px solid #C8A96A; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: rgba(255,248,235,0.7); margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Ember & Grain</div>
          <div class="tagline">Fine Dining · San Francisco</div>
        </div>
        <div class="ticket">
          <div class="ticket-title">Your Table is Confirmed 🔥</div>
          <hr class="divider" />
          <div class="booking-id">${booking.booking_id}</div>
          <hr class="divider" />
          <div class="row"><span class="label">Name</span><span class="value">${booking.customer_name}</span></div>
          <div class="row"><span class="label">Date</span><span class="value">${booking.booking_date}</span></div>
          <div class="row"><span class="label">Time</span><span class="value">${booking.booking_time}</span></div>
          <div class="row"><span class="label">Guests</span><span class="value">${booking.guests}</span></div>
          <div class="row"><span class="label">Seating</span><span class="value">${booking.seating_zone}</span></div>
          ${booking.special_requests ? `<div class="row"><span class="label">Requests</span><span class="value">${booking.special_requests}</span></div>` : ''}
          <div class="note">Please arrive 10 minutes before your reservation. To make changes call us at (555) 123-4567</div>
        </div>
        <div class="footer">
          © Ember & Grain · 742 Evergreen Terrace, San Francisco, CA
        </div>
      </div>
    </body>
    </html>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Ember & Grain <onboarding@resend.dev>',
      to: booking.customer_email,
      subject: `Reservation Confirmed — ${booking.booking_id}`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});