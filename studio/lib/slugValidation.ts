import type {Slug} from 'sanity'

const KEBAB_CASE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function validateSlug(slug: Slug | undefined): true | string {
  if (!slug?.current) {
    return 'A slug is required.'
  }

  return KEBAB_CASE_SLUG.test(slug.current)
    ? true
    : 'Use lowercase letters, numbers, and single hyphens only.'
}
