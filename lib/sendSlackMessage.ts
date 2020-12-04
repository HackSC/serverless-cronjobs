import event from '../types/event'

const SendSlackMessage = async (e: event, app: any, starting_phrase: string) => {
  try {
    let slack_channel = process.env.SLACK_ANNOUNCEMENTS_CHANNEL
      ? process.env.SLACK_ANNOUNCEMENTS_CHANNEL
      : "C01FUMML1JA"; // * #2021-app-announcements

    // console.log("Sending Slack Announcement to ", slack_channel);
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: slack_channel,
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
              text: `Starting At: ${e.startsAt}\n`,
            },
            {
              type: "mrkdwn",
              text: `Ends At: ${e.endsAt}\n`,
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