# Cursor Prompt: Create the Project Directory and Scaffold

You are setting up a new production-quality B2B exotic produce website using the project's `.cursor/rules/*.mdc` rules as the source of truth.

Do not build the full website yet. This task is only to create the correct project structure, install the intended stack, create the core configuration files, and establish the foundations needed for implementation.

## Stack

Public website:
- Astro
- TypeScript
- Tailwind CSS
- React only as islands for genuinely interactive UI
- Sanity for CMS/content
- GROQ for content queries
- Astro server/API endpoints
- Resend for transactional quote emails, unless the repository explicitly specifies Postmark
- Vercel deployment
- GitHub source control

Sanity Studio:
- Separate React-based Sanity Studio application inside `studio/`

Do not introduce Next.js, Express, a separate backend service, Redux, Zustand, Prisma, or a database at this stage.

## Required structure

Create a structure similar to:

```text
/
├── .cursor/
│   └── rules/
├── public/
│   ├── fonts/              # only if self-hosted fonts are actually required
│   ├── icons/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── astro/
│   │   └── react/
│   ├── layouts/
│   ├── lib/
│   │   ├── sanity/
│   │   ├── seo/
│   │   └── server/
│   ├── pages/
│   │   ├── api/
│   │   │   └── quote.ts
│   │   ├── products/
│   │   │   └── [slug].astro
│   │   ├── journal/
│   │   │   └── [slug].astro
│   │   ├── index.astro
│   │   ├── products.astro
│   │   ├── who-we-serve.astro
│   │   ├── about.astro
│   │   ├── sustainability.astro
│   │   ├── journal.astro
│   │   └── request-a-quote.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       ├── product.ts
│       └── quote.ts
├── studio/
│   ├── schemaTypes/
│   ├── lib/
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── package.json
├── .env.example
├── .gitignore
├── astro.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

You may adjust names when Astro conventions or generated project defaults make a better equivalent. Do not create unnecessary folders just to match this tree literally.

## Implementation requirements

1. Inspect the repository first. If a project already exists, preserve useful existing code and adapt rather than deleting everything.
2. If Astro is not initialized, initialize the Astro project with TypeScript.
3. Configure Tailwind using the current recommended Astro integration for the chosen Tailwind version.
4. Configure React integration for islands only.
5. Configure the Vercel adapter because the site will use Astro server endpoints for the quote form.
6. Configure path aliases only when they improve clarity.
7. Add a minimal global stylesheet containing the design-token foundation, not the finished UI.
8. Add `.env.example` with variable names only. Never add real secrets.
9. Create placeholder route files so the architecture is visible, but do not fill them with the final design yet.
10. Create the Sanity Studio scaffold in `studio/` with placeholder schema registration.
11. Add a README that explains how to run the public site and Studio locally.
12. Keep the root project and Studio independently runnable.
13. Make sure the initial project builds cleanly before finishing.

## Initial environment variables

Use placeholder names appropriate to the selected architecture, such as:

```env
PUBLIC_SITE_URL=
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
SANITY_API_VERSION=
SANITY_READ_TOKEN=
RESEND_API_KEY=
WHOLESALE_EMAIL=
```

Only expose values to the browser when they are genuinely public.

## Do not implement yet

Do not yet implement:
- final homepage sections
- final product catalogue UI
- full Sanity schemas
- final quote form
- analytics tracking
- authentication
- customer portal
- payments
- Postgres/Neon
- shopping cart/checkout

Those belong to later stages.

## Verification

After scaffolding:
- run type checking
- run the production build
- confirm the site starts locally
- confirm the Studio starts locally if possible
- report any command failures and fix them before finishing

Do not stop after creating folders. The scaffold must be a valid runnable foundation.
