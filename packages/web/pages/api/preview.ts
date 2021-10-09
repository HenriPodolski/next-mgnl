import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
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
  await runAPIMiddleware(req, res, cors);

  // it should only hide the preview from the public
  if (
    !req.query.secret ||
    req.query.secret !== process.env.MGNL_PREVIEW_SECRET
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});

  res.redirect(String(req.query.path));
}
