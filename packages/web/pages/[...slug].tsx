import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
} from 'next';

import Page, { getStaticProps } from './index';

export default Page;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = ({
  locales,
  defaultLocale,
}: GetStaticPathsContext): GetStaticPathsResult => {
  console.log('getStaticPaths locales, defaultLocale', locales, defaultLocale);

  return {
    paths: [],
    fallback: process.env.MGNL_PREVIEW_EXPORT ? false : 'blocking',
  };
};
