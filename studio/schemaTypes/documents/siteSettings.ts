import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  description: 'Global identity, contact details, and fallback metadata. Maintain one document only.',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'The public brand name used in page titles and metadata.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      description: 'A factual overview of the business for fallback metadata.',
      validation: (rule) => rule.required().min(40).max(160),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Public contact email',
      type: 'string',
      description: 'Shown to visitors. This is not the private quote-delivery configuration.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Public contact phone',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'businessAddress',
      title: 'Business address',
      type: 'text',
      rows: 3,
      description: 'Optional verified public address.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default search and social metadata',
      type: 'seo',
      description: 'Fallback metadata used when a page does not provide its own values.',
    }),
  ],
  preview: {
    select: {title: 'siteName', subtitle: 'siteDescription'},
    prepare: ({title, subtitle}) => ({title: title || 'Site settings', subtitle}),
  },
})
