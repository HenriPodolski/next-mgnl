import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { runAPIMiddleware } from '../../utils/run-api-middleware';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runAPIMiddleware(req, res, cors);
  // if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  res.setPreviewData({});
  console.log('preview req', req.headers.cookie);
  // res.redirect('preview');
  res.redirect('/api/Home');
}
