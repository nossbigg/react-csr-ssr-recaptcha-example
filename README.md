# react-csr-ssr-recaptcha-example

This repository is a barebones example of how to use Google reCAPTCHA v3 together with React (Client-side Rendering and Server-side Rendering)

## Running Example Locally

**Prerequisites**

Requires Google reCAPTCHA v3 API key pair:

1. Request an API key pair [here](https://www.google.com/recaptcha/admin/create)
1. In _Domains_ options, add `localhost` and `127.0.0.1` (to allow calls from local machine)

**Environment Variables**

This example repository requires the following environment variables to work correctly:

1. `RECAPTCHA_SITE_KEY` - Used to call reCAPTCHA API from Client-side
1. `RECAPTCHA_SECRET_KEY` - Used to call reCAPTCHA API from Server-side (must not be exposed to public!)

**Commands to run locally**

| Command                                                               | What it does                                  | Default port |
| --------------------------------------------------------------------- | --------------------------------------------- | ------------ |
| `RECAPTCHA_SECRET_KEY=<recaptcha_secret_key_here> yarn start:backend` | Starts node backend instance                  | 3005         |
| `RECAPTCHA_SITE_KEY=<recaptcha_site_key_here> yarn start:csr`         | Starts React Client-side rendering instance   | 3001         |
| `RECAPTCHA_SITE_KEY=<recaptcha_site_key_here> yarn start:ssr`         | Starts Next.js Server-side rendering instance | 3002         |

## References

- [Developer's Guide | reCAPTCHA | Google Developers](https://developers.google.com/recaptcha/intro)
- [Express.js Routing](https://expressjs.com/en/guide/routing.html)
- [Getting Started | Create React App](https://create-react-app.dev/docs/getting-started/)
- [Getting Started | Next.js](https://nextjs.org/docs/getting-started)
