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
      channel_id: {
        type: Schema.types.string,
        description: "Channel to send message to",
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
      channel_id: {
        type: Schema.types.string,
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
    const { question, channel_id } = inputs;

    // Send a message to channel using a nicely formatted
    // message using block elements from Block Kit.
    // https://api.slack.com/block-kit
    await client.chat.postMessage({
      channel: channel_id || "C06STDB31C1",
      text: `${question}`,
    });

    // app.action("approve_button", async ({ complete, fail }) => {
    //   // Signal the function has completed once the button is clicked
    //   await complete({ outputs: { message: "Request approved 👍" } });
    // });

    // Return all inputs as outputs for consumption in subsequent functions
    return {
      outputs: { answer: "true" },
    };
  },
);
