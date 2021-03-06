import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  buildMagnoliaDataPath,
  getAcceptLang,
  getMagnoliaData,
} from '../../utils/magnolia-data-requests';
import { runAPIMiddleware } from '../../utils/run-api-middleware';
import normalizeSluck from '../../utils/normalize-sluck';

const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS'],
  origin: process.env.MGNL_HOST,
  credentials: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { NEXTJS_HOST, MGNL_LANGUAGES } = process.env;
  await runAPIMiddleware(req, res, cors);
  const slug = normalizeSluck(req.query);
  const preview = Boolean(req.preview);

  const acceptLanguages = JSON.parse(MGNL_LANGUAGES as string);
  const languages = Object.keys(acceptLanguages);

  const {
    apiBase,
    currentPathname,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  } = buildMagnoliaDataPath(slug, preview, languages);

  const acceptLanguage =
    (req.headers['accept-language'] as string) ||
    getAcceptLang('en', acceptLanguages);

  const { pageJson, templateDefinitions = null } = await getMagnoliaData({
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
    acceptLanguage,
    acceptLanguages,
  });

  res.status(200).json({
    host: NEXTJS_HOST,
    pageJson,
    templateDefinitions,
    preview,
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
    currentPathname,
    languages,
    language: acceptLanguage.substr(0, 2),
    acceptLanguages,
  });
}
