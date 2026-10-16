import {defineField, defineType} from 'sanity'
import {validateSlug} from '../../lib/slugValidation'

export const categoryNames = [
  'Exotic Vegetables',
  'Herbs',
  'Microgreens',
  'Leafy Greens',
  'Seasonal Produce',
  'Specialty Produce',
  "Nature's Sweets",
] as const

export const category = defineType({
  name: 'category',
  title: 'Product category',
  type: 'document',
  description:
    'One of the seven top-level catalogue categories. Growing methods such as Hydroponic belong on products, not here.',
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'string',
      description:
        'Pick one name from the list (do not type a custom name). Create a separate category document for each list item—for example, one document with Nature\'s Sweets.',
      options: {
        list: categoryNames.map((name) => ({title: name, value: name})),
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Stable, lowercase URL segment used under the product catalogue.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().custom(validateSlug),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Concise category introduction for navigation and catalogue pages.',
      validation: (rule) => rule.required().min(20).max(180),
    }),
    defineField({
      name: 'image',
      title: 'Category image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Search and social', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'shortDescription', media: 'image'},
  },
  orderings: [{title: 'Category name', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
