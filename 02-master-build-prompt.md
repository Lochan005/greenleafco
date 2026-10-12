# Master Cursor Prompt: Build the B2B Exotic Produce Website

You are the lead frontend engineer, UI/UX designer, technical SEO engineer, and implementation architect for this project.

Build a polished production-quality B2B website for a premium exotic vegetable and specialty fresh produce supplier.

The `.cursor/rules/*.mdc` files are the project's source of truth. Read and follow the applicable rules before changing code. Do not override them with generic UI conventions.

## First principle

Do not "vibe code" the website.
Do not stack generic sections until the page looks full.
Design each section around a specific user question, trust signal, discovery task, or conversion goal.

The finished site must look deliberately art-directed and commercially credible, not like an AI-generated template.

---

# 1. Business and audience

The website is B2B.
Primary audiences include:
- restaurants
- chefs
- hotels and hospitality groups
- retailers
- resellers
- distributors
- other professional buyers

The visitor must quickly understand:
1. what the company supplies
2. what makes the produce distinctive
3. who the company supplies
4. how to explore the catalogue
5. how to request a wholesale conversation

The site is not a consumer grocery store.

Do not build:
- add to cart
- checkout
- consumer price-first shopping
- fake inventory counters
- fake product ratings
- fake reviews

Primary conversion action:
`Request a Quote`

Secondary actions may include:
`View Product`, `Enquire About Availability`, and `Talk to Our Team`.

---

# 2. Technology architecture

Use:
- Astro
- TypeScript
- Tailwind CSS
- React islands only when interaction genuinely requires client-side state
- Sanity
- GROQ
- Astro server/API endpoints
- Resend for quote-email delivery unless the project explicitly chooses Postmark
- Vercel
- GitHub

Do not introduce:
- Next.js
- unnecessary Express/backend services
- Redux/Zustand unless a real requirement appears
- Postgres/Neon at this stage
- authentication
- a client portal
- payments

Future portal/database requirements must not contaminate the public marketing architecture.

---

# 3. Page architecture

Implement these public page types:

1. Home
2. Products catalogue
3. Product detail template
4. Who We Serve
5. About Us
6. Sustainability
7. Recipes & Inspiration / Culinary Journal
8. Request a Quote / Contact

Use one reusable product-detail template driven by Sanity.
Use one reusable journal-detail template driven by Sanity.

Recommended URLs:

```text
/
/products
/products/[slug]
/who-we-serve
/about
/sustainability
/journal
/journal/[slug]
/request-a-quote
```

Use lowercase kebab-case slugs.

---

# 4. Design direction

The design language is:

`Exotic + Minimal + Premium + Natural + Editorial + B2B`

The interface should feel closer to a premium culinary/produce brand than a generic ecommerce store.

Use:
- warm ivory/off-white base
- botanical/deep green anchor color
- charcoal typography
- muted earthy neutrals
- restrained produce-inspired accent colors
- large editorial imagery
- macro produce photography
- farm/greenhouse photography
- culinary imagery
- strong typography
- generous whitespace
- subtle borders/dividers
- asymmetric but controlled compositions

Avoid:
- loud gradients
- glassmorphism
- neon UI
- excessive rounded cards
- excessive pills
- decorative blobs
- random icons
- giant shadows
- dashboard aesthetics
- overly green pages
- repetitive centered card grids
- fake enterprise metrics

Product photography must be visually important.

---

# 5. Header/navigation

Desktop header should remain intentionally minimal:

`Logo | Products | Request a Quote | Menu`

Do not display every page in the header.
The logo links home.

The hamburger/menu contains secondary pages such as:
- Who We Serve
- Journal / Recipes & Inspiration
- About Us
- Sustainability
- Contact / Request a Quote if not already visible
- future client portal if added later

Mobile:
- Logo
- Menu
- optionally a compact quote CTA if it does not crowd the header

The menu must be keyboard accessible, visually refined, and feel intentional rather than like a generic sidebar.

---

# 6. Product taxonomy

Top-level categories are fixed as:

- Exotic Vegetables
- Herbs
- Microgreens
- Leafy Greens
- Seasonal Produce
- Specialty Produce

Important taxonomy rule:

`Hydroponic` is not a category.
It is a growing-method attribute/filter/badge.

Other attributes may include:
- Available Now
- Seasonal
- Hydroponic
- Chef Favourite
- New Arrival
- Suitable For

Do not mix categories and attributes into one flat navigation list.

---

# 7. Homepage

Build the homepage as a narrative, not a collection of unrelated blocks.

Recommended flow:

### Hero
Communicate the category and B2B value proposition immediately.
Use premium produce imagery.
Primary CTA: `Explore Our Produce`
Secondary CTA: `Request a Quote`

### Product Categories
Show the six primary categories in a visually strong but restrained way.
The visitor should understand the breadth of the catalogue.

### Featured Products
Show a curated selection from Sanity.
Use product-card patterns from the design system.

### Who We Serve
Show key B2B audiences:
- restaurants
- hotels/hospitality
- retail
- resellers/distributors

Use strong imagery and concise commercial copy.

### Why Choose Us
Focus on credible benefits such as:
- product quality
- consistency
- range
- responsive supply
- professional support

Do not invent quantitative claims.

### From Farm to Kitchen
Tell the sourcing/growing/handling story without inventing operational facts.
Use real client information when available.

### Sustainability
Use a practical tone.
Suggested direction:
`Sustainability starts with what we can control.`

Potential themes:
- responsible growing
- efficient resource usage
- waste reduction
- thoughtful packaging
- smarter distribution

Do not claim carbon neutrality, zero waste, organic certification, pesticide-free produce, or similar facts unless evidence is provided.

### Culinary Inspiration
Connect ingredients to chefs, dishes, techniques, or journal content.

### Seasonal / Available Now
Help professional buyers discover what is relevant now.
Do not imply real-time stock without a real inventory source.

### Testimonials / Trust
Only use real testimonials, brands, or logos supplied by the client.
Otherwise create a clearly marked content placeholder rather than fake social proof.

### Final B2B CTA
End with a strong quote/enquiry section.

---

# 8. Product catalogue

The `/products` page should feel like premium B2B ecommerce browsing without checkout.

Recommended structure:
1. hero
2. category navigation
3. search
4. filters
5. product grid
6. useful seasonal/available-now merchandising block
7. quote CTA

Filters may include:
- category
- availability
- growing method
- suitable for

Product cards contain:
- image
- product name
- category
- short description
- useful badges
- View Product

Do not show consumer prices or cart controls.

For filtering/search, prefer the lightest technically sound solution.
Use URL parameters when they make filter states shareable and useful.

---

# 9. Product detail template

Build a reusable `/products/[slug]` template.

Recommended information hierarchy:

- breadcrumbs where useful
- large gallery
- product name
- concise product summary
- category
- availability state
- relevant attributes
- pack sizes
- culinary applications
- storage/handling
- suitable-for audiences
- growing method where relevant
- related products
- primary Request a Quote CTA

Do not render empty sections.

Product detail pages should feel editorial and informative, not like marketplace listings.

---

# 10. Sanity CMS

Use Sanity as the source of truth for managed content.

Create appropriate schemas for:
- product
- category/reference structure as needed
- journal/recipe entry
- testimonial if required
- site settings
- homepage merchandising/featured content where useful

Product should support fields such as:
- name
- slug
- category
- shortDescription
- description
- images/gallery
- availability
- seasonal
- growingMethod
- badges
- suitableFor
- packSizes
- culinaryUses
- storageAndHandling
- relatedProducts
- featured
- SEO title/description/image

Do not create schema fields purely because they might be useful someday.

Use clear validation and editor-friendly descriptions.

GROQ queries must be explicit and only fetch what is required.

---

# 11. Quote form and API

Create `/request-a-quote` and a reusable quote form.

Suggested fields:
- name
- company
- email
- phone
- business type
- products of interest
- quantity/requirement
- delivery location
- message

The submission flow is:

`Browser -> Astro API endpoint -> server validation -> anti-spam checks -> Resend -> wholesale desk`

Server validation is mandatory.

Never expose email credentials in the browser.

On success show a genuine success state only after the server confirms the request was accepted.

Make errors useful and safe.

Do not add a database yet.

---

# 12. SEO

Build SEO into every page.

Every indexable page needs:
- unique title
- meta description
- canonical URL
- Open Graph metadata
- appropriate H1
- semantic headings
- descriptive image alt text

Implement:
- sitemap
- robots.txt
- canonical handling
- structured data where genuinely applicable
- internal links between products, categories, journal content, and quote CTAs

Use natural topic language around:
- exotic vegetables
- exotic vegetable supplier
- premium fresh produce
- exotic vegetables for restaurants
- specialty vegetables
- microgreens supplier
- B2B fresh produce supplier

Do not keyword stuff.

Do not fabricate price, ratings, availability, certifications, reviews, or inventory data in structured data.

---

# 13. Accessibility

Use semantic HTML.

All interactions must support:
- keyboard access
- visible focus states
- useful labels
- accessible errors
- accessible mobile menu
- screen-reader-compatible navigation

Do not use clickable divs when buttons/links are appropriate.
Respect reduced motion.

---

# 14. Responsive behavior

Design mobile-first.

Do not simply collapse desktop layouts.
Re-compose layouts where needed.

Check:
- narrow mobile
- normal mobile
- tablet
- laptop
- wide desktop

Control:
- image cropping
- heading wrapping
- container widths
- line lengths
- card heights
- filter behavior
- menu behavior
- CTA prominence

Avoid brittle fixed heights.

---

# 15. Dynamic UI consistency

The website will be judged heavily on whether dynamic content still looks designed when text, images, or product data changes.

Build against these rules:

### Typography
- headings must wrap gracefully
- never use fixed heights for text containers unless truly required
- define reasonable max widths for headings
- avoid single-line assumptions

### Images
- use controlled aspect ratios
- use `object-fit` and deliberate object positioning
- reserve image space before loading
- ensure one product image cannot break the grid

### Cards
- maintain aligned visual structure
- allow text blocks to grow
- avoid equal-height hacks that clip content

### Overlays
- verify text contrast on light and dark images
- add a real overlay when necessary
- never assume every uploaded image has the same brightness

### Layout
- use max-width containers
- use consistent spacing tokens
- avoid arbitrary per-section values unless the composition demands them

### Data variability

Test with:
- very short product names
- very long product names
- missing optional fields
- long descriptions
- missing images
- long company names
- mobile widths

The UI must remain coherent.

---

# 16. Performance

Use Astro's HTML-first architecture.

Keep React hydration minimal.

Optimize images through Sanity's image pipeline/CDN.

Avoid unnecessary packages.

Protect:
- LCP
- CLS
- INP

Do not make the page visually impressive by shipping large amounts of JavaScript.

---

# 17. Analytics

Add analytics only after core functionality is working.

Useful events:
- product viewed
- category selected
- search used
- filter applied
- quote form started
- quote submitted
- quote failed

Do not collect unnecessary personal information.

---

# 18. Implementation workflow

Follow this sequence.

## Phase 1: inspect
- inspect current repository
- inspect available assets
- inspect current dependencies
- inspect `.cursor/rules`
- inspect any existing Sanity setup

Do not destroy useful work.

## Phase 2: foundations
- confirm project structure
- install/configure required integrations
- establish design tokens
- establish global typography
- establish layout container system
- establish buttons/links/forms

## Phase 3: global UI
- header
- desktop navigation
- mobile menu
- footer
- global SEO/layout primitives

## Phase 4: homepage
Build and visually inspect before proceeding.

## Phase 5: catalogue
Build the `/products` page and filtering behavior.

## Phase 6: product template
Build `/products/[slug]` and validate it with several kinds of product data.

## Phase 7: supporting pages
Build:
- Who We Serve
- About
- Sustainability
- Journal
- Journal detail

## Phase 8: quote flow
Build form + endpoint + Resend integration.

## Phase 9: SEO/performance/accessibility
Complete technical polish.

## Phase 10: final visual audit
Inspect every route at multiple viewport sizes.

---

# 19. Content integrity

Never invent factual business information.

Do not invent:
- certifications
- number of farms
- warehouse size
- delivery times
- customer counts
- years of operation
- geographic coverage
- partner brands
- awards
- restaurant logos
- reviews
- sustainability metrics

When the client has not supplied a fact:
- use neutral copy that does not assert it, or
- create a clear placeholder for later client input

The website must never sound convincingly factual when the facts were fabricated.

---

# 20. Quality gate before declaring completion

Before considering a page complete, verify:

### Visual
- hierarchy is clear
- sections have distinct composition
- whitespace is intentional
- imagery is consistent
- no clipping/overflow
- no awkward text wrapping
- no accidental horizontal scroll

### Responsive
- mobile works
- tablet works
- desktop works
- navigation works
- filters work
- forms work

### Accessibility
- keyboard navigation works
- focus is visible
- labels are correct
- images have appropriate alt text
- semantic HTML is used

### Technical
- type check passes
- build passes
- no missing routes
- no broken imports
- no exposed secrets
- no unnecessary client hydration

### SEO
- metadata exists
- canonical is correct
- sitemap exists
- robots behavior is correct
- H1 is sensible
- internal links work

### Content integrity
- no invented business claims
- no fake testimonials
- no fake inventory
- no unsupported sustainability claims

Do not say the website is complete until the quality gate has been checked.

---

# Final instruction

Build the website as a coherent visual system, not a set of isolated pages.

Reuse the same design language, spacing rhythm, product components, CTA hierarchy, image treatment, and typography throughout the project.

When a design decision is uncertain, prefer the option that is:
1. clearer to the B2B buyer
2. more visually premium
3. simpler technically
4. more reusable
5. more accessible
6. faster

Do not add complexity just to make the code look sophisticated.
