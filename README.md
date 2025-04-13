# Vercel Proxy

A simple serverless proxy for stripping CSP and X-Frame-Options so you can embed arbitrary pages.

## Endpoints

- `GET /api/proxy?url=<ENCODED_URL>`

## Usage

```html
<iframe src="https://<your‑project>.vercel.app/api/proxy?url=https%3A%2F%2Fexample.com"></iframe>
