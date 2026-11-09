# Environment Configuration Guide

This document describes how to configure environment variables for the **Final-Portfolio** project in both local development and deployment (Vercel) environments.

---

## Overview

The project uses [Vite environment variables](https://vitejs.dev/guide/env-and-mode.html) prefixed with `VITE_` to expose configuration to the client-side application at build time.

### Required Environment Variables

| Variable | Description | Required | Where to get it |
|---|---|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for the Coach Dinesh AI chatbot | Yes (for chatbot functionality) | [Google AI Studio](https://aistudio.google.com/apikey) |

> **Note:** The chatbot will gracefully degrade if the API key is not set — it displays a message asking the user to configure the key instead of crashing.

---

## Local Development Setup

1. **Copy the example environment file:**

   ```sh
   cp .env.example .env
   ```

2. **Fill in the values in `.env`:**

   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the development server:**

   ```sh
   npm install
   npm run dev
   ```

Vite automatically loads variables from `.env` during development. The `.env` file is listed in `.gitignore` and **must never be committed** to version control.

---

## Deployment (Vercel)

When deploying to Vercel, environment variables must be configured through the Vercel dashboard — they are **not** read from a `.env` file.

### Steps

1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Navigate to **Settings → Environment Variables**.
3. Add the following variable:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environment:** Select `Production`, `Preview`, and `Development` as needed.
4. Click **Save**.
5. **Redeploy** the project for the changes to take effect (Vercel → Deployments → Redeploy).

> Vercel injects these variables at **build time**. Since Vite embeds `VITE_`-prefixed variables into the client bundle during the build step, any change to environment variables requires a new deployment.

---

## Other Deployment Platforms

If deploying to a platform other than Vercel (e.g., Netlify, Cloudflare Pages, AWS Amplify):

1. Locate the platform's environment variable settings (usually under project settings or build configuration).
2. Add `VITE_GEMINI_API_KEY` with your API key value.
3. Trigger a new build/deployment.

The key principle is the same across all platforms: `VITE_`-prefixed variables must be available as environment variables during the **build** step.

---

## Security Best Practices

- **Never commit `.env` files** to version control. The `.gitignore` is configured to exclude them.
- **Rotate API keys** immediately if they are ever accidentally committed or exposed.
- **Use `.env.example`** as a template — it contains placeholder values, not real secrets.
- **Restrict API key permissions** when possible (e.g., limit by referrer or IP in the Google Cloud Console).
- For Vite projects, be aware that all `VITE_`-prefixed variables are **embedded in the client-side bundle** and visible to end users. Do not put truly secret values (like server-side-only keys) in `VITE_` variables.

---

## Adding New Environment Variables

When adding a new environment variable to the project:

1. Add the variable to `.env.example` with a placeholder value and a descriptive comment.
2. Add the TypeScript type to `src/vite-env.d.ts` inside the `ImportMetaEnv` interface.
3. Update this document's table above.
4. Update the Vercel (or other platform) environment variable settings.
