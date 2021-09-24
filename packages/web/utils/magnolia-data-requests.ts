export interface MagnoliaDataRequestParams {
  apiBase: string;
  pageJsonPath: string;
  pageTemplateDefinitionsPath?: string;
}

export interface MagnoliaDataResponse<TPageJSON, TTemplateDef> {
  pageJson: TPageJSON;
  templateDefinitions?: TTemplateDef;
}

export function getCleanCurrentPathName(
  currentPathname: string,
  authorPathPart: string
): string {
  authorPathPart = (authorPathPart ? authorPathPart : '').replace(/^\//, '');
  const cleanRegex = new RegExp(
    `(?:(^\/)|(${authorPathPart})(\/)(.+)(\.html))`,
    'gi'
  );

  currentPathname = currentPathname.replace(cleanRegex, '$4');

  return currentPathname;
}

export function buildMagnoliaDataPath(slug: string[], preview: boolean) {
  const { MGNL_HOST, MGNL_PATH_AUTHOR, MGNL_API_TEMPLATES, MGNL_API_PAGES } =
    process.env;
  const apiBase = `${MGNL_HOST}${preview ? MGNL_PATH_AUTHOR : ''}`;
  let currentPathname = slug ? slug.join('/') : '';
  currentPathname = getCleanCurrentPathName(
    currentPathname,
    MGNL_PATH_AUTHOR || ''
  );

  const pageJsonPath = `${MGNL_API_PAGES}/${currentPathname}`;
  let pageTemplateDefinitionsPath;

  if (preview) {
    pageTemplateDefinitionsPath = MGNL_API_TEMPLATES;
  }

  console.log('pageJsonPath', pageJsonPath);

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
