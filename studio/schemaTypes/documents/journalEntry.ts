import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateSlug} from '../../lib/slugValidation'

export const journalEntry = defineType({
  name: 'journalEntry',
  title: 'Journal entry',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'recipe', title: 'Recipe details'},
    {name: 'relationships', title: 'Related products'},
    {name: 'seo', title: 'Search and social'},
  ],
  fields: [
    defineField({
      name: 'entryType',
      title: 'Entry type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Article or inspiration', value: 'article'},
          {title: 'Recipe', value: 'recipe'},
        ],
        layout: 'radio',
      },
      initialValue: 'article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(4).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      description: 'Stable, lowercase URL used for this journal entry.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().custom(validateSlug),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'A concise summary for journal cards and search results.',
      validation: (rule) => rule.required().min(30).max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          validation: (rule) => rule.max(200),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      group: 'content',
      description: 'Controls the date shown to readers and journal ordering.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string',
      group: 'content',
      description: 'Optional author or team name.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'servings',
      title: 'Yield or servings',
      type: 'string',
      group: 'recipe',
      hidden: ({document}) => document?.entryType !== 'recipe',
      description: 'Use a clear, non-numeric description when exact yield varies.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      group: 'recipe',
      hidden: ({document}) => document?.entryType !== 'recipe',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ingredient',
          fields: [
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'string',
              validation: (rule) => rule.max(40),
            }),
            defineField({
              name: 'ingredient',
              title: 'Ingredient',
              type: 'string',
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: 'note',
              title: 'Preparation note',
              type: 'string',
              validation: (rule) => rule.max(120),
            }),
          ],
          preview: {
            select: {title: 'ingredient', quantity: 'quantity', note: 'note'},
            prepare: ({title, quantity, note}) => ({
              title,
              subtitle: [quantity, note].filter(Boolean).join(' · '),
            }),
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as {entryType?: string}
          return document?.entryType === 'recipe' && (!value || value.length === 0)
            ? 'Add at least one ingredient for a recipe.'
            : true
        }),
    }),
    defineField({
      name: 'method',
      title: 'Method',
      type: 'blockContent',
      group: 'recipe',
      hidden: ({document}) => document?.entryType !== 'recipe',
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as {entryType?: string}
          return document?.entryType === 'recipe' && (!value || value.length === 0)
            ? 'Add a method for a recipe.'
            : true
        }),
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Featured ingredients and products',
      type: 'array',
      group: 'relationships',
      description: 'Link products that are directly relevant to this entry.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: 'featured',
      title: 'Featured entry',
      type: 'boolean',
      group: 'relationships',
      initialValue: false,
    }),
    defineField({name: 'seo', title: 'Search and social', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', entryType: 'entryType', publishedAt: 'publishedAt', media: 'mainImage'},
    prepare: ({title, entryType, publishedAt, media}) => ({
      title,
      subtitle: [entryType === 'recipe' ? 'Recipe' : 'Article', publishedAt?.slice(0, 10)]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
  orderings: [
    {title: 'Publication date, newest', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
    {title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
})
