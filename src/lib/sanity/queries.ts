export const categoryFields = `
  _id,
  title,
  "slug": slug.current,
  "description": shortDescription
`;

export const productCardFields = `
  "id": _id,
  name,
  "slug": slug.current,
  shortDescription,
  "primaryImage": images[0],
  availability,
  growingMethod,
  badges,
  suitableFor,
  featured,
  "category": category->{${categoryFields}}
`;

export const allCategoriesQuery = `*[_type == "category"] | order(title asc) {
  ${categoryFields}
}`;

export const allProductsQuery = `*[_type == "product"] | order(name asc) {
  ${productCardFields}
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(name asc)[0...4] {
  ${productCardFields}
}`;

export const productSlugsQuery = `*[_type == "product" && defined(slug.current)] {
  "slug": slug.current
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  ${productCardFields},
  description,
  "gallery": images,
  packSizes,
  culinaryUses,
  storageAndHandling,
  "relatedProducts": relatedProducts[]->{
    ${productCardFields}
  },
  seo
}`;

export const journalEntriesQuery = `*[_type == "journalEntry"] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "image": mainImage,
  seo
}`;

export const journalSlugsQuery = `*[_type == "journalEntry" && defined(slug.current)] {
  "slug": slug.current
}`;

export const journalEntryBySlugQuery = `*[_type == "journalEntry" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "image": mainImage,
  body,
  "relatedProducts": relatedProducts[]->{
    name,
    "slug": slug.current
  },
  seo
}`;

export const homepageQuery = `*[_type == "homepage"][0] {
  eyebrow,
  heading,
  introduction,
  heroImage,
  "featuredProducts": featuredProducts[]->{
    ${productCardFields}
  },
  "featuredJournalEntries": featuredJournalEntries[]->{
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "image": mainImage,
    seo
  },
  quoteCtaHeading,
  quoteCtaText,
  seo
}`;
