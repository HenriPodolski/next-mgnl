import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  buildMagnoliaDataPath,
  getAcceptLang,
  getMagnoliaData,
} from '../../utils/magnolia-data-requests';
import { runAPIMiddleware } from '../../utils/run-api-middleware';

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
  const { slug } = req.query;
  const preview = Boolean(req.preview);
  const languages =
    MGNL_LANGUAGES && MGNL_LANGUAGES.split(' ').length
      ? MGNL_LANGUAGES.split(' ')
      : ['en'];

  const {
    apiBase,
    currentPathname,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  } = buildMagnoliaDataPath(
    typeof slug === 'string' ? [slug] : slug,
    preview,
    languages
  );

  const acceptLanguage =
    (req.headers['accept-language'] as string) || getAcceptLang('en');

  const { pageJson, templateDefinitions = null } = await getMagnoliaData({
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
    acceptLanguage,
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
  });
}
