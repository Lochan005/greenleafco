# Greenleaf Co

Premium B2B website for exotic vegetables and specialty fresh produce. The
repository contains the Astro marketing site, Sanity Studio, a Sanity-driven
catalogue and journal, and a server-side wholesale quote workflow.

## Public site

From the repository root:

```sh
npm install
npm run dev
```

Open http://localhost:4321

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local site |
| `npm run check` | Typecheck the public site |
| `npm test` | Run quote validation and endpoint tests |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |

Copy `.env.example` to `.env` when you have real values. Leave a variable unset
until it has a value. `SANITY_API_VERSION` defaults to `2026-01-01` when unset.
Do not commit `.env`.

`PUBLIC_` variables are exposed to the browser. `SANITY_READ_TOKEN`,
`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `WHOLESALE_EMAIL` stay on the server.

For quote delivery:

- `RESEND_API_KEY` is the server API key.
- `RESEND_FROM_EMAIL` must be a sender on a verified Resend domain for production.
- `WHOLESALE_EMAIL` is the private inbox that receives enquiries.

Without all required email settings, the endpoint returns a safe temporary
unavailable response and never shows a false success state.

## Sanity Studio

Studio is a separate app in `studio/`.

```sh
cd studio
npm install
npm run dev
```

Open http://localhost:3333

Copy `studio/.env.example` to `studio/.env` and set:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

Until those values point at a real Sanity project, Studio starts with the
placeholder id `00000000` and shows “Project not found”. Schema registration is
in `studio/schemaTypes/index.ts`.

Create the six fixed category documents first, then products, journal entries,
site settings, and the singleton homepage document. Product and journal detail
routes are generated from published Sanity slugs. The public site renders clear
empty states until content is published.

When the production site is deployed, configure a Sanity webhook or deployment
hook to trigger a new Vercel build after relevant content is published.

## Stack

- Astro, TypeScript, and Tailwind CSS
- React only for interactive islands
- Sanity and GROQ
- Astro server endpoint at `/api/quote`
- Resend API for quote email delivery
- Vercel
