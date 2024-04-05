import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const PostIssueMessage = DefineFunction({
  callback_id: "query_api_id",
  title: "Post an issue to channel",
  description: "Query API and post response to channel",
  source_file: "functions/query_api.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      // submitting_user: {
      //   type: Schema.slack.types.user_id,
      // },
      question: {
        type: Schema.types.string,
        description: "Question",
      },
      environment: {
        type: Schema.types.string,
        description: "Execution Environment",
      },
    },
    required: ["question", "environment", "channel"],
  },
  output_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      submitting_user: {
        type: Schema.slack.types.user_id,
      },
      question: {
        type: Schema.types.string,
        description: "Question",
      },
      environment: {
        type: Schema.types.string,
        description: "Execution Environment",
      },
    },
    required: ["question", "environment"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  PostIssueMessage,
  async ({ inputs, client }) => {
    const { channel, question, environment } = inputs;
    // const severityEmoji: { [key: string]: string } = {
    //   low: ":white_circle:",
    //   medium: ":large_blue_circle:",
    //   high: ":red_circle:",
    // };

    // Send a message to channel using a nicely formatted
    // message using block elements from Block Kit.
    // https://api.slack.com/block-kit
    await client.chat.postMessage({
      channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*Question asked:*\n${question}\n\n`,
          },
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*Execution environment:*\n${environment || "N/A"}\n\n`,
          },
        },
      ],
    });

    // Return all inputs as outputs for consumption in subsequent functions
    return {
      outputs: { channel, environment, question },
    };
  },
);
