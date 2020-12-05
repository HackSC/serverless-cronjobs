import type { NextApiRequest, NextApiResponse } from 'next'
import CreateSlackApp from '../../lib/createSlackApp';
import SendSlackMessage from '../../lib/sendSlackMessage';

type Data = {
  result: string
}

type QueryType = NextApiRequest & {
    body: {
        name: string,
        description: string,
        startsAt: string,
        endsAt: string
    }
}

export default async (req: QueryType, res: NextApiResponse<Data>) => {
  const app = await CreateSlackApp();
  if(!!app && !!req) {
    try {
      // * Send Slack Message using req.body
      SendSlackMessage(JSON.parse(req.body), app, "C01G1US5RS6", "");
      // * Done iterating over events, so we were successful.
      return res.status(200).json({ result: 'Successfully sent slack messages!' })
    }
    catch (e) {
      return res.status(500).json({ result: "Failed to parse body as json!" })
    }
  } else {
    // * App and req have to be valid
    console.error("Failed to initialize slack app :alarm:")
    return res.status(500).json({ result: 'Failed to send slack messages - slack app could not be created! :alarm:' })
  }
}