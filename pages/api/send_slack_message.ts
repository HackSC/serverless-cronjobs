import type { NextApiRequest, NextApiResponse } from 'next'
import CreateSlackApp from '../../lib/createSlackApp';
import SendSlackMessage from '../../lib/sendSlackMessage';
import event from '../../types/event';

type Data = {
  result: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const app = await CreateSlackApp();
  if(!!app && !!req) {
    // * Fetch event schedule from odyssey API
    await fetch("https://dashboard.hacksc.com/api/public/events/list")
      .then((result) => result.json())
      .then((events) => {
        events.events.forEach((e: event) => {
          let curr_date_min_10 = Math.round(
            new Date().setMinutes(new Date().getMinutes() + 10) / (1000 * 60) -
              new Date().getTimezoneOffset()
          );
          let curr_time = Math.round(
            new Date().getTime() / (1000 * 60) - new Date().getTimezoneOffset()
          );

          let event_start_time = Date.parse(e.startsAt) / (1000 * 60);

          if (
            event_start_time - curr_date_min_10 > -1 &&
            event_start_time - curr_date_min_10 < 1
          ) {
            SendSlackMessage(e, app, "starting in 10 minutes");
          }
          if (
            event_start_time - curr_time > -1 &&
            event_start_time - curr_time < 1
          ) {
            SendSlackMessage(e, app, "starts now");
          }
        });

        // * Done iterating over events, so we were successful.
        return res.status(200).json({ result: 'Successfully sent slack messages!' })
      });
  } else {
    // * App and req have to be valid
    console.error("Failed to initialize slack app :alarm:")
    return res.status(500).json({ result: 'Failed to send slack messages - slack app could not be created! :alarm:' })
  }
}