import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { PostIssueMessage } from "../functions/query_api.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const QueryAPIWorkflow = DefineWorkflow({
  callback_id: "query_api_interactive",
  title: "Query API",
  description: "Query API through a channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel", "interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = QueryAPIWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Query API",
    interactivity: QueryAPIWorkflow.inputs.interactivity,
    submit_label: "Submit",
    fields: {
      elements: [
        {
          name: "question",
          title: "Question",
          type: Schema.types.string,
          long: true,
        },
        {
          name: "environment",
          title: "Execution Environment",
          type: Schema.types.string,
        },
      ],
      required: ["question", "environment"],
    },
  },
);

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
QueryAPIWorkflow.addStep(
  PostIssueMessage,
  {
    channel: QueryAPIWorkflow.inputs.channel,
    question: inputForm.outputs.fields.question,
    environment: inputForm.outputs.fields.environment,
  },
);

export default QueryAPIWorkflow;
