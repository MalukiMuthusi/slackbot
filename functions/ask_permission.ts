import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const AskPermissionMessage = DefineFunction({
  callback_id: "ask_permission_id",
  title: "Request permission to execute generated code",
  description: "Request permission to execute generated code",
  source_file: "functions/ask_permission.ts",
  input_parameters: {
    properties: {
      question: {
        type: Schema.types.string,
        description: "Question",
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["question"],
  },
  output_parameters: {
    properties: {
      answer: {
        type: Schema.types.string,
        description: "User's answer",
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["answer"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  AskPermissionMessage,
  async ({ inputs, client }) => {
    const { question } = inputs;
    // const severityEmoji: { [key: string]: string } = {
    //   low: ":white_circle:",
    //   medium: ":large_blue_circle:",
    //   high: ":red_circle:",
    // };

    // Send a message to channel using a nicely formatted
    // message using block elements from Block Kit.
    // https://api.slack.com/block-kit
    // const r = await client.chat.postMessage({
    //   blocks: [
    //     {
    //       "type": "section",
    //       "text": {
    //         "type": "mrkdwn",
    //         "text": `*Question asked:*\n${question}\n\n`,
    //       },
    //     },
    //   ],
    // });

    // Return all inputs as outputs for consumption in subsequent functions
    return {
      outputs: { answer: "true" },
    };
  },
);
