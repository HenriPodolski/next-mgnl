import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  buildMagnoliaDataPath,
  getMagnoliaData,
} from '../../utils/magnolia-data-requests';
import { runAPIMiddleware } from '../../utils/run-api-middleware';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { NEXTJS_HOST } = process.env;
  await runAPIMiddleware(req, res, cors);
  const { slug } = req.query;
  const preview = Boolean(process.env.MGNL_PREVIEW);

  console.log('handle preview', process.env.NODE_ENV, req.headers.cookie);

  const {
    apiBase,
    currentPathname,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  } = buildMagnoliaDataPath(typeof slug === 'string' ? [slug] : slug, preview);

  const { pageJson, templateDefinitions } = await getMagnoliaData({
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
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
  });
}
