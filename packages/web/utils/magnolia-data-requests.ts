export interface MagnoliaDataRequestParams {
  apiBase: string;
  pageJsonPath: string;
  pageTemplateDefinitionsPath?: string;
}

export interface MagnoliaDataResponse<TPageJSON, TTemplateDef> {
  pageJson: TPageJSON;
  templateDefinitions?: TTemplateDef;
}

export function buildMagnoliaDataPath(slug: string[]) {
  const {
    MGNL_PREVIEW,
    MGNL_HOST,
    MGNL_PATH_AUTHOR,
    MGNL_API_TEMPLATES,
    MGNL_API_PAGES,
  } = process.env;
  const apiBase = `${MGNL_HOST}${MGNL_PREVIEW ? MGNL_PATH_AUTHOR : ''}`;
  let currentPathname = slug
    ? slug.map((slugParam: any) => slugParam.replace('.html', '')).join('/')
    : '';

  const authorPathPart = (MGNL_PATH_AUTHOR ? MGNL_PATH_AUTHOR : '').replace(
    /^\//,
    ''
  );

  currentPathname = currentPathname
    .replace(authorPathPart, '')
    .replace(/^\//, '');

  const pageJsonPath = `${MGNL_API_PAGES}/${currentPathname}`;
  let pageTemplateDefinitionsPath;

  if (MGNL_PREVIEW) {
    pageTemplateDefinitionsPath = MGNL_API_TEMPLATES;
  }

  return {
    apiBase,
    currentPathname,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  };
}

export async function getMagnoliaData<TPageJSON, TTemplateDef>({
  apiBase,
  pageJsonPath,
  pageTemplateDefinitionsPath,
}: MagnoliaDataRequestParams): Promise<
  MagnoliaDataResponse<TPageJSON, TTemplateDef>
> {
  const pageJsonEndpoint = `${apiBase}${pageJsonPath}`;

  console.log('pageJsonEndpoint', pageJsonEndpoint);

  let response = await fetch(pageJsonEndpoint);
  let templateDefinitions;
  const pageJson = await response.json();

  if (pageTemplateDefinitionsPath) {
    response = await fetch(
      `${apiBase}${pageTemplateDefinitionsPath}` +
        '/' +
        pageJson['mgnl:template']
    );
    templateDefinitions = await response.json();
  }

  return { pageJson, templateDefinitions };
}
