import {defineField, defineType} from 'sanity'

export const productImage = defineType({
  name: 'productImage',
  title: 'Product image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the produce and relevant visual context.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional editorial caption. Do not add claims that have not been verified.',
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'asset'},
    prepare: ({title, media}) => ({title: title || 'Product image', media}),
  },
})
