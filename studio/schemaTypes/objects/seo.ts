import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and social',
  type: 'object',
  description: 'Optional metadata used when this content appears in search results or is shared.',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'A concise, unique title. Leave blank to use the document title.',
      validation: (rule) => rule.max(60).warning('Search titles are usually best kept under 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'A useful summary for search results. Do not include unsupported claims.',
      validation: (rule) =>
        rule.max(160).warning('Search descriptions are usually best kept under 160 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Social sharing image',
      type: 'image',
      description: 'Optional image for link previews. The main image is used as a fallback where supported.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for people who cannot see it.',
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Enable only when this page should not appear in search results.',
      initialValue: false,
    }),
  ],
})
