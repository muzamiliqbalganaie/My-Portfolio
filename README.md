# Vite React App

This project was bootstrapped with Vite and uses React as the framework.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Serves the production build locally for testing.

## Learn More

To learn more about Vite, check out the [Vite documentation](https://vitejs.dev/).

To learn more about React, check out the [React documentation](https://reactjs.org/).

## Contact form deployment

The contact form uses Cloudflare Turnstile and the Vercel function in `api/contact.js`.

Set these variables in the deployment provider, never in Git:

- `VITE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

`EMAILJS_PRIVATE_KEY` is used only by the server-side function and must not be
exposed through a `VITE_` variable or committed to the repository. After
changing EmailJS credentials in the deployment provider, redeploy the
application so the function receives the updated values. If EmailJS returns
HTTP 403, verify that the private key belongs to the same EmailJS account as
the public key and that private-key protection is enabled in the EmailJS
account security settings.

The API limits each IP address to five successful submissions per hour. The in-memory limit is per serverless instance; use a shared edge rate-limit provider if the deployment needs a globally consistent limit.

For local development, copy `.env.example` to `.env` and configure the Vercel CLI or another local function runner for `/api/contact`.
