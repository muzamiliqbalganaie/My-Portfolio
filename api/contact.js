const requests = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

const json = (body, status) => ({
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export default async function handler(request) {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const recentRequests = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
    if (recentRequests.length >= MAX_REQUESTS) return json({ error: 'Too many requests. Please try again later.' }, 429);

    const { name, email, message, turnstileToken, company } = request.body || {};
    if (company || !turnstileToken || !name || !email || !message) return json({ error: 'Invalid form submission' }, 400);
    if (name.length > 60 || email.length > 120 || message.length > 1000) return json({ error: 'Form fields are too long' }, 400);

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: globalThis.process.env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
    });
    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) return json({ error: 'Security check failed' }, 403);

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: globalThis.process.env.EMAILJS_SERVICE_ID,
            template_id: globalThis.process.env.EMAILJS_TEMPLATE_ID,
            user_id: globalThis.process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: name,
                to_name: 'Muzmail Iqbal',
                from_email: email,
                to_email: 'muzamiliqbalganaie@gmail.com',
                message,
            },
        }),
    });
    if (!emailResponse.ok) {
        const body = await emailResponse.text();

        let message = 'Unable to send message';

        try {
            message = JSON.parse(body).error || message;
        } catch {
            // The server returned non-JSON content, such as a 404 page.
        }

        throw new Error(message);
    }

    requests.set(ip, [...recentRequests, now]);
    return json({ ok: true }, 200);
}