const requests = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const TURNSTILE_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const json = (response, body, status) => response.status(status).json(body);

async function validateTurnstile(token, remoteip) {
    const secret = globalThis.process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return { success: false, error: 'Turnstile is not configured' };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(TURNSTILE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret,
                response: token,
                ...(remoteip !== 'unknown' ? { remoteip } : {}),
            }),
            signal: controller.signal,
        });

        if (!response.ok) return { success: false, error: 'Turnstile request failed' };
        return await response.json();
    } catch (error) {
        console.error('Turnstile validation error:', error);
        return { success: false, error: 'Turnstile validation failed' };
    } finally {
        clearTimeout(timeoutId);
    }
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return json(response, { error: 'Method not allowed' }, 405);
    }

    const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const recentRequests = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
    if (recentRequests.length >= MAX_REQUESTS) {
        return json(response, { error: 'Too many requests. Please try again later.' }, 429);
    }

    const { name, email, message, turnstileToken, company } = request.body || {};
    if (company || !turnstileToken || !name || !email || !message) {
        return json(response, { error: 'Invalid form submission' }, 400);
    }
    if (name.length > 60 || email.length > 120 || message.length > 1000) {
        return json(response, { error: 'Form fields are too long' }, 400);
    }

    const turnstileResult = await validateTurnstile(turnstileToken, ip);
    if (!turnstileResult.success) {
        return json(response, { error: 'Security check failed' }, 403);
    }
    if (globalThis.process.env.TURNSTILE_EXPECTED_ACTION && turnstileResult.action !== globalThis.process.env.TURNSTILE_EXPECTED_ACTION) {
        return json(response, { error: 'Security check failed' }, 403);
    }

    const serviceId = globalThis.process.env.EMAILJS_SERVICE_ID || globalThis.process.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = globalThis.process.env.EMAILJS_TEMPLATE_ID || globalThis.process.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = globalThis.process.env.EMAILJS_PUBLIC_KEY || globalThis.process.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
        console.error('Email service is not configured');
        return json(response, { error: 'Email service is not configured' }, 500);
    }

    let emailResponse;
    try {
        emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                    from_name: name,
                    to_name: 'Muzamil Iqbal',
                    from_email: email,
                    to_email: 'muzamiliqbalganaie@gmail.com',
                    message,
                },
            }),
        });
    } catch (error) {
        console.error('EmailJS request error:', error);
        return json(response, { error: 'Unable to send message' }, 502);
    }

    if (!emailResponse.ok) {
        const body = await emailResponse.text();

        let message = 'Unable to send message';

        try {
            message = JSON.parse(body).error || message;
        } catch {
            // The server returned non-JSON content, such as a 404 page.
        }

        console.error('EmailJS error:', {
            status: emailResponse.status,
            message,
            serviceConfigured: Boolean(serviceId),
            templateConfigured: Boolean(templateId),
            publicKeyConfigured: Boolean(publicKey),
        });
        return json(response, { error: 'Unable to send message' }, 502);
    }

    requests.set(ip, [...recentRequests, now]);
    return json(response, { ok: true }, 200);
}