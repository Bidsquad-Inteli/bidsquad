import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ name: 'John Doe' })
      break
    case 'POST':
      res.status(200).json({ name: 'John Doe' })
      break
    case 'PUT':
      res.status(200).json({ name: 'John Doe' })
      break
    case 'DELETE':
      res.status(200).json({ name: 'John Doe' })
      break

    default:
      break
  }
}
