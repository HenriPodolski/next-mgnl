import { fetcher } from './fetcher';
import useSWR from 'swr';

export interface MagnoliaDataRequestParams {
  apiBase: string;
  pageJsonPath: string;
  acceptLanguage: string;
  acceptLanguages: { [key: string]: string };
  pageTemplateDefinitionsPath?: string;
}

export interface MagnoliaDataResponse<TPageJSON, TTemplateDef> {
  pageJson: TPageJSON;
  templateDefinitions?: TTemplateDef;
}

export const stdFetchInit = (
  language: string,
  acceptLanguage: { [key: string]: string }
): RequestInit => ({
  headers: {
    'Accept-Language': getAcceptLang(language, acceptLanguage),
  },
  credentials: 'include',
});

/**
 * Used for rehydrate data on clientside
 * @param host
 * @param language
 * @param acceptLanguages
 * @param registerPreview
 * @param preview
 * @param secret
 * @param pathname
 * @param fetchInterval
 * @param props
 */
export function useMagnoliaData<TFallbackData>({
  host,
  language,
  acceptLanguages,
  registerPreview,
  preview,
  secret,
  pathname,
  fetchInterval,
  props,
}: {
  host: string;
  language: string;
  acceptLanguages: { [key: string]: string };
  secret: string;
  preview: boolean;
  pathname: string;
  registerPreview: boolean;
  fetchInterval: number;
  props: TFallbackData;
}) {
  const previewEndpoint = `${host}/api/preview?secret=${secret}&path=${pathname}`;
  const pagePropsEndpoint = `${host}/api/${pathname}`;

  return useSWR(
    () =>
      !preview && registerPreview && secret
        ? previewEndpoint
        : pagePropsEndpoint,
    (input: RequestInfo) =>
      fetcher(input, stdFetchInit(language, acceptLanguages)),
    {
      fallbackData: props,
      refreshInterval: fetchInterval,
      revalidateIfStale: preview || Boolean(registerPreview && secret),
      revalidateOnFocus: preview || Boolean(registerPreview && secret),
      revalidateOnReconnect: preview || Boolean(registerPreview && secret),
    }
  );
}

export function getCleanCurrentPathParts(
  currentPathname: string,
  authorPathPart: string,
  languages: string[]
): { pathname: string; language: string } {
  let language = languages[0];
  authorPathPart = (authorPathPart ? authorPathPart : '').replace(/^\//, '');
  const cleanRegex = new RegExp(
    `(?:(^\/)|(${authorPathPart})(\/)(.+)(\.html))`,
    'gi'
  );
  const languageParamRegex = new RegExp(`^(${languages.join('|')})(\/)(.+)$`);

  currentPathname = currentPathname.replace(cleanRegex, '$4');
  const languageRegExpResult = languageParamRegex.exec(currentPathname);

  if (
    languageRegExpResult &&
    languageRegExpResult[1] &&
    languages.includes(languageRegExpResult[1])
  ) {
    currentPathname =
      languageRegExpResult[2] === '/' && languageRegExpResult[3]
        ? languageRegExpResult[3]
        : '';
    language = languageRegExpResult[1];
  }

  return {
    pathname: currentPathname,
    language,
  };
}

export function getAcceptLang(
  lang: string,
  acceptLanguages: { [key: string]: string }
): string {
  const locales: { [key: string]: string } = acceptLanguages;

  if (Object.values(locales).includes(lang)) {
    return lang;
  }

  return locales[lang] ? locales[lang] : locales.en;
}

export function buildMagnoliaDataPath(
  slug: string[],
  preview: boolean,
  languages: string[]
) {
  const { MGNL_HOST, MGNL_PATH_AUTHOR, MGNL_API_TEMPLATES, MGNL_API_PAGES } =
    process.env;
  const apiBase = `${MGNL_HOST}${preview ? MGNL_PATH_AUTHOR : ''}`;
  let currentPathname = slug ? slug.join('/') : '';
  const pathParts = getCleanCurrentPathParts(
    currentPathname,
    MGNL_PATH_AUTHOR || '',
    languages
  );

  currentPathname = pathParts.pathname;
  const language = pathParts.language;

  const pageJsonPath = `${MGNL_API_PAGES}/${currentPathname}`;
  let pageTemplateDefinitionsPath;

  if (preview) {
    pageTemplateDefinitionsPath = MGNL_API_TEMPLATES;
  }

  return {
    apiBase,
    currentPathname,
    language,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  };
}

export async function getMagnoliaData<TPageJSON, TTemplateDef>({
  apiBase,
  pageJsonPath,
  pageTemplateDefinitionsPath,
  acceptLanguage,
  acceptLanguages,
}: MagnoliaDataRequestParams): Promise<
  MagnoliaDataResponse<TPageJSON, TTemplateDef>
> {
  const pageJsonEndpoint = `${apiBase}${pageJsonPath}`;

  console.log(
    'getMagnoliaData pageJsonEndpoint, lang',
    pageJsonEndpoint,
    'Accept-Language:',
    stdFetchInit(acceptLanguage, acceptLanguages)
  );

  let response = await fetch(
    pageJsonEndpoint,
    stdFetchInit(acceptLanguage, acceptLanguages)
  );
  let templateDefinitions;
  const pageJson = await response.json();

  if (pageTemplateDefinitionsPath && pageJson['mgnl:template']) {
    response = await fetch(
      `${apiBase}${pageTemplateDefinitionsPath}` +
        '/' +
        pageJson['mgnl:template'],
      {
        credentials: 'include',
      }
    );
    templateDefinitions = await response.json();
  }

  return { pageJson, templateDefinitions };
}
