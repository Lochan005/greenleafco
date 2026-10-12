import type {StructureResolver} from 'sanity/structure'

const singletonSchemaTypes = new Set(['siteSettings', 'homepage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonSchemaTypes.has(item.getId() ?? '')),
    ])
