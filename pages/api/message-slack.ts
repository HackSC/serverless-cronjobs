import type { NextApiRequest, NextApiResponse } from 'next'
import CreateSlackApp from '../../lib/createSlackApp';
import SendSlackMessage from '../../lib/sendSlackMessage';

type Data = {
  result: string
}

type QueryType = NextApiRequest & {
    query: NextApiRequest & {
        name: string,
        description: string,
        startsAt: string,
        endsAt: string
    }
}

export default async (req: QueryType, res: NextApiResponse<Data>) => {
  const app = await CreateSlackApp();
  if(!!app && !!req) {
    // * Send Slack Message using req.query
    SendSlackMessage(req.query, app, "C01G1US5RS6", "starts now");
    // * Done iterating over events, so we were successful.
    return res.status(200).json({ result: 'Successfully sent slack messages!' })
  } else {
    // * App and req have to be valid
    console.error("Failed to initialize slack app :alarm:")
    return res.status(500).json({ result: 'Failed to send slack messages - slack app could not be created! :alarm:' })
  }
}