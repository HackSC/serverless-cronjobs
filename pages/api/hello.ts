import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if(req) res.status(200).json({ name: 'John Doe' })
  else res.status(500).json({name: "Please do not hit this route..."})
}