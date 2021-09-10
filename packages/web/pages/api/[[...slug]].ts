import Cors from 'cors';
import {
  buildMagnoliaDataPath,
  getMagnoliaData,
} from '../../utils/magnolia-data-requests';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(
  req: any,
  res: any,
  fn: (arg0: any, arg1: any, arg2: (result: any) => void) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: any, res: any) {
  const { MGNL_PREVIEW, NEXTJS_HOST } = process.env;
  await runMiddleware(req, res, cors);
  const { slug } = req.query;

  const {
    apiBase,
    currentPathname,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  } = buildMagnoliaDataPath(slug);

  const { pageJson, templateDefinitions } = await getMagnoliaData({
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
  });

  res.status(200).json({
    host: NEXTJS_HOST,
    pageJson,
    templateDefinitions,
    preview: MGNL_PREVIEW,
    apiBase,
    pageJsonPath,
    pageTemplateDefinitionsPath,
    currentPathname,
  });
}
