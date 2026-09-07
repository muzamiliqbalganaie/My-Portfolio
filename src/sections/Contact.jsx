import { useEffect, useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const { VITE_TURNSTILE_SITE_KEY } = import.meta.env;

const Contact = () => {
    const formRef = useRef();
    const turnstileRef = useRef();
    const turnstileWidgetId = useRef();

    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');

    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const whitelistRegex = {
        name: /^[a-zA-Z .,'-]{0,60}$/,
        email: /^[a-zA-Z0-9@._-]{0,60}$/,
        message: /^[\x20-\x7E\n\r]{0,1000}$/
    };

    const handleChange = ({ target: { name, value } }) => {
        let filtered = value;
        if (whitelistRegex[name]) {
            filtered = value.match(whitelistRegex[name])?.[0] ?? '';
        }
        setForm({ ...form, [name]: filtered });
    };

    useEffect(() => {
        if (!VITE_TURNSTILE_SITE_KEY) return undefined;

        const renderWidget = () => {
            if (!turnstileRef.current || !window.turnstile) return false;
            turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
                sitekey: VITE_TURNSTILE_SITE_KEY,
                callback: setTurnstileToken,
                'expired-callback': () => setTurnstileToken(''),
                'error-callback': () => setTurnstileToken(''),
            });
            return true;
        };

        if (renderWidget()) return undefined;
        const intervalId = window.setInterval(() => {
            if (renderWidget()) window.clearInterval(intervalId);
        }, 100);

        return () => {
            window.clearInterval(intervalId);
            if (
                window.turnstile &&
                turnstileWidgetId.current !== undefined
            ) {
                window.turnstile.remove(turnstileWidgetId.current);
                turnstileWidgetId.current = undefined;
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!turnstileToken || loading) return;
        setLoading(true);

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, turnstileToken }),
        })
            .then(
                async (response) => {
                    if (!response.ok) throw new Error((await response.json()).error || 'Unable to send message');
                    setLoading(false);
                    showAlert({
                        show: true,
                        text: 'Thanks for your message 👌',
                        type: 'success',
                    });

                    setTimeout(() => {
                        hideAlert(false);
                        setForm({
                            name: '',
                            email: '',
                            message: '',
                        });
                        setTurnstileToken('');
                        if (window.turnstile && turnstileWidgetId.current !== undefined) window.turnstile.reset(turnstileWidgetId.current);
                    }, 3000);
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    showAlert({
                        show: true,
                        text: "I didn't receive your message 😢",
                        type: 'danger',
                    });
                    setTurnstileToken('');
                    if (window.turnstile && turnstileWidgetId.current !== undefined) window.turnstile.reset(turnstileWidgetId.current);
                },
            );
    };

    return (
        <section className="c-space my-20" id="contact">
            {alert.show && <Alert {...alert} />}

            <div className="relative min-h-screen flex items-center justify-center flex-col rounder-sm">
                <img src="/assets/terminal.png" alt="" aria-hidden="true" role="presentation" className="absolute inset-0 min-h-screen object-fit max-w-full h-full " />

                <div className="relative contact-container min-w-72  bg-black bg-opacity-70 rounded-lg my-16 p-10 md:p-16 shadow-2xl z-10">
                    <h3 className="head-text break-words">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3 break-words overflow-wrap break-word">
                        Ready to start your next project or elevate your digital presence? Whether you need a brand-new website, want to enhance your current platform, or have a unique idea in mind, I’m excited to collaborate and help bring your vision to life. Let’s connect and make something great together!
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., John Doe"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., johndoe@gmail.com"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Share your thoughts or inquiries..."
                            />
                        </label>

                        <input type="text" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />

                        <div ref={turnstileRef} aria-label="Security check" />

                        <button className="field-btn flex items-center justify-center gap-2 hover:scale-110  hover:text-emerald-100" type="submit" disabled={loading || !turnstileToken}>
                            {loading ? (
                                <>
                                    <span className="loader border-2 border-t-2 border-white rounded-full w-4 h-4 animate-spin"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;