import { ParsedUrlQuery } from 'querystring';

/**
 * used to get an array of slug parameters
 * @param params
 */
export default function normalizeSluck(
  params: ParsedUrlQuery | undefined
): string[] {
  let slug: string[] = [];

  if (params && typeof params.slug === 'string') {
    slug = [params.slug];
  } else if (params && params.slug instanceof Array) {
    slug = params.slug;
  }
  slug = slug.filter((item) => item !== '.html');

  return slug;
}
