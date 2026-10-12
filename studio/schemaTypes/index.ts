import type {SchemaTypeDefinition} from 'sanity'
import {category} from './documents/category'
import {homepage} from './documents/homepage'
import {journalEntry} from './documents/journalEntry'
import {product} from './documents/product'
import {siteSettings} from './documents/siteSettings'
import {blockContent} from './objects/blockContent'
import {productImage} from './objects/productImage'
import {seo} from './objects/seo'

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  productImage,
  seo,
  category,
  product,
  journalEntry,
  siteSettings,
  homepage,
]
