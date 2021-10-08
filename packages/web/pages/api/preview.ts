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
  console.log('preview handler headers', req.headers, req.query);

  await runAPIMiddleware(req, res, cors);
  res.setPreviewData({});

  res.status(200).json({ success: true });
}
