import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { runAPIMiddleware } from '../../utils/run-api-middleware';
import { getAcceptLang } from '../../utils/magnolia-data-requests';

const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS'],
  origin: process.env.MGNL_HOST,
  credentials: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runAPIMiddleware(req, res, cors);

  const acceptLanguages = JSON.parse(process.env.MGNL_LANGUAGES as string);
  const acceptLanguage =
    (req.headers['accept-language'] as string) ||
    getAcceptLang('en', acceptLanguages);
  res.setHeader('accept-language', acceptLanguage);

  // it should hide the preview from the public
  if (
    !req.query.secret ||
    req.query.secret !== process.env.MGNL_PREVIEW_SECRET
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});

  res.redirect(String(req.query.path));
}
