# Sanity content inputs

Fill these in Sanity Studio at http://localhost:3333. Create documents in the order below, then publish each one. The public site reads published content on its next build.

Leave a field empty when you do not have a verified fact. Do not add certifications, delivery promises, stock counts, awards, reviews, or sustainability metrics unless you can support them.

## How the public site uses this content

| Studio document | Replaces on the site |
| --- | --- |
| Product category | Catalogue category filters |
| Product | Catalogue cards and `/products/[slug]` |
| Journal entry | Journal cards and `/journal/[slug]` |
| Homepage | Hero text, hero image, featured products, featured journal stories, closing quote heading |
| Site settings | Stored only. The public site does not display these fields yet. |

These designed placeholders are still written in the website code. Publishing Sanity content does not replace them:

| Page | Placeholder |
| --- | --- |
| Home | Professional kitchen photography |
| Home | Growing and handling photography |
| Home | Sustainability photography |
| Who We Serve | Hospitality photography |
| Who We Serve | Produce handling photography |
| About | Company or growing photography |
| Sustainability | Growing photography |

The logo is the text “Greenleaf Co”. There is no logo upload in Studio.

## Image guidance

Upload real photographs. Every image also needs alternative text that describes what is in the picture, up to 160 characters.

| Use | Shape the site expects | Suggested source size |
| --- | --- | --- |
| Homepage hero | Portrait, about 4:5 | 1600 × 2000 px |
| Product catalogue card | Portrait, 4:5 | 1200 × 1500 px |
| Product detail | Square, 1:1 | 1600 × 1600 px |
| Journal card and article | Landscape, 3:2 | 1800 × 1200 px |
| Social sharing image | Landscape, about 1.91:1 | 1200 × 630 px |

The first product gallery image is the catalogue image. Drag gallery images to set their order. You can upload up to 10 images per product. Gallery images may be omitted when entering text first; add them before the product is customer-ready. The site shows an “Image pending” placeholder when the gallery is empty.

## 1. Product categories

Create one document for each name. Hydroponic is not a category.

| Category name | Suggested slug |
| --- | --- |
| Exotic Vegetables | `exotic-vegetables` |
| Herbs | `herbs` |
| Microgreens | `microgreens` |
| Leafy Greens | `leafy-greens` |
| Seasonal Produce | `seasonal-produce` |
| Specialty Produce | `specialty-produce` |
| Nature's Sweets | `natures-sweets` |

For each category:

| Field | Required | Limit | What to supply |
| --- | --- | --- | --- |
| Category name | Yes | Fixed list above | One of the seven names |
| URL slug | Yes | Lowercase, stable | Generate from the name, then leave it unchanged |
| Short description | Yes | 20–180 characters | What this group contains for a professional buyer |
| Category image | No | One image plus alt text | Stored only. The site does not show category images yet. |
| Search and social | No | See the shared SEO fields below | Optional |

## 2. Products

Create one Product document for every item that should appear in the catalogue. Copy this block once per product.

```text
Product name:
URL slug:
Category:
Short description (20–180 characters):
Full description:
Gallery images:
  1. File / alt text / optional caption
  2. File / alt text / optional caption
Availability: Available now | Available to enquire | Seasonal | Unavailable
Seasonal product: yes / no
Growing method: Hydroponic | Soil grown | Other verified method | leave blank
Badges:
Suitable for:
Pack sizes:
Culinary uses:
Storage and handling:
Related products:
Featured on homepage fallback: yes / no
SEO title:
Meta description:
Social image and alt text:
Hide from search engines: yes / no
```

| Field | Required | Limit | Where it appears |
| --- | --- | --- | --- |
| Product name | Yes | 2–100 characters | Cards, product page heading, enquiry link |
| URL slug | Yes | Lowercase, stable | `/products/[slug]` |
| Category | Yes | One of the seven categories | Card label and filters |
| Short description | Yes | 20–180 characters | Cards and the summary under the product name |
| Full description | No | Rich text | Product page. Headings inside the text are shown as paragraphs. |
| Gallery | No (recommended before go-live) | 0–10 images | First image on the card and product page. Empty gallery is allowed for import; further images are stored only. |
| Availability | Yes | One option | Card and product page. This is editorial guidance, not live stock. |
| Seasonal product | No | Yes or no | Stored only |
| Growing method | No | Hydroponic, Soil grown, or Other verified method | Product page and catalogue filter |
| Badges | No | Up to 5 unique labels | Stored only. Labels: Available Now, Seasonal, Hydroponic, Chef Favourite, New Arrival. |
| Suitable for | No | Restaurants and chefs, Hotels and hospitality, Retailers, Resellers and distributors | Product page |
| Pack sizes | No | Up to 12, 80 characters each | Product page |
| Culinary uses | No | Up to 12, 100 characters each | Product page |
| Storage and handling | No | 600 characters | Product page |
| Related products | No | Up to 6 other products | Product page |
| Featured product | No | Yes or no | Homepage featured area when the Homepage document has no featured list |
| Search and social | No | See below | Product page title, description, and share image |

After bulk text import and the image pass, restore required gallery validation in `studio/schemaTypes/documents/product.ts` (`rule.required().min(1).max(10)`) so new products cannot publish without at least one image.

## 3. Journal entries

Create one document for each article or recipe. Copy this block once per entry.

```text
Entry type: Article or inspiration | Recipe
Title:
URL slug:
Excerpt (30–200 characters):
Main image / alt text / optional caption:
Publication date:
Byline:
Article body:
Yield or servings:
Ingredients:
  - Quantity / ingredient / preparation note
Method:
Related products:
Featured entry: yes / no
SEO title:
Meta description:
Social image and alt text:
Hide from search engines: yes / no
```

| Field | Required | Limit | Where it appears |
| --- | --- | --- | --- |
| Entry type | Yes | Article or Recipe | Studio only |
| Title | Yes | 4–120 characters | Journal cards and article heading |
| URL slug | Yes | Lowercase, stable | `/journal/[slug]` |
| Excerpt | Yes | 30–200 characters | Cards and the article introduction |
| Main image | Yes | One image, alt text, optional caption up to 200 characters | Cards and the article image. Caption is stored only. |
| Publication date | Yes | Date and time | Card label and article date |
| Byline | No | 80 characters | Stored only |
| Article body | Yes | Rich text | Article page, as paragraphs |
| Yield or servings | Recipe only | 80 characters | Stored only |
| Ingredients | Recipe only | At least one. Ingredient up to 120 characters. Quantity and note up to 40 and 120. | Stored only |
| Method | Recipe only | Rich text | Stored only |
| Related products | No | Up to 8 products | Links at the bottom of the article |
| Featured entry | No | Yes or no | Stored only, unless selected in Homepage |
| Search and social | No | See below | Article title, description, and share image |

## 4. Homepage

Create the single Homepage document.

| Field | Required | Limit | Where it appears |
| --- | --- | --- | --- |
| Hero eyebrow | No | 50 characters | Small label above the homepage heading. Default: “Premium produce · Professional supply”. |
| Hero heading | Yes | 10–100 characters | Homepage heading. Default: “Produce with presence.” |
| Hero introduction | Yes | 30–240 characters | Paragraph under the heading |
| Hero image | Yes | One image plus alt text | Large portrait image beside the heading |
| Featured categories | No | Up to 6 categories | Stored only. The homepage still lists all six category names. |
| Featured products | No | Up to 8 products, in display order | Homepage product section. If empty, products marked Featured are used. |
| Seasonal or timely products | No | Up to 8 products | Stored only |
| Culinary inspiration | No | Up to 4 journal entries, in display order | Homepage journal section. If empty, the latest journal entries are used. |
| Quote call-to-action heading | No | 100 characters | Closing green band. Default: “Looking for something specific?” |
| Quote call-to-action text | No | 220 characters | Text in that band |
| Search and social | No | See below | Homepage title, description, and share image |

## 5. Site settings

Create the single Site settings document. These values are saved for later use. They do not currently change the public pages.

| Field | Required | Limit | What to supply |
| --- | --- | --- | --- |
| Site name | Yes | 80 characters | Public brand name |
| Site description | Yes | 40–160 characters | Factual overview for fallback metadata |
| Public contact email | No | Valid email | Address visitors may use. This is separate from the private wholesale inbox. |
| Public contact phone | No | 40 characters | Public phone number |
| Business address | No | 300 characters | Verified public address |
| Default search and social metadata | No | See below | Fallback title, description, and share image |

## Shared search and social fields

These appear on categories, products, journal entries, the homepage, and site settings.

| Field | Required | Limit | What to supply |
| --- | --- | --- | --- |
| SEO title | No | Prefer under 60 characters | Search result title. Blank uses the document title. |
| Meta description | No | Prefer under 160 characters | Search result summary |
| Social sharing image | No | One image plus alt text | Link-preview image. Product and journal pages fall back to their main image. |
| Hide from search engines | No | Yes or no | Turn on only for a page that should stay out of search results |

## Suggested first publish set

1. All six categories, with short descriptions.
2. At least one product in each category you want to show, each with one photograph and alt text.
3. Mark the products that should appear on the homepage, or select them on the Homepage document.
4. The Homepage document, including its hero photograph.
5. Any journal stories you want on the homepage, each with a main photograph.
6. Site settings, even though the site does not display them yet.

After publishing, rebuild the public site so new product and journal pages are generated.
