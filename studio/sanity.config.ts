import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './lib/structure'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '00000000'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const singletonTypes = new Set(['homepage', 'siteSettings'])

export default defineConfig({
  name: 'greenleafco',
  title: 'Greenleaf Co',
  projectId,
  dataset,
  plugins: [structureTool({structure})],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : actions,
  },
})
