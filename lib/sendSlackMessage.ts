import event from '../types/event'

const createFormattedDateTimeString = (iso: string) => {
  let date = new Date(iso);
  return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

const SendSlackMessage = async (e: event, app: any, channel: string, starting_phrase: string) => {
  try {
    // console.log("Sending Slack Announcement to ", channel);
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: ``,
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: `${e.name} ${starting_phrase}!`,
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Description: ${e.description}\n`,
            },
            {
              type: "mrkdwn",
              text: `Starting At: ${createFormattedDateTimeString(e.startsAt)}\n`,
            },
            {
              type: "mrkdwn",
              text: `Ends At: ${createFormattedDateTimeString(e.endsAt)}\n`,
            },
          ],
        },
        {
          type: "divider",
        },
      ],
    });
  } catch (msg_error) {
    console.error("Could not send slackbot message: ", msg_error);
  }
};

export default SendSlackMessage;