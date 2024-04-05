import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { AskPermissionMessage } from "../functions/ask_permission.ts";

const APIPermitWebhookWorkflow = DefineWorkflow({
  callback_id: "permit_api_workflow",
  title: "Permit API",
  description: "Permit API execution",
  input_parameters: {
    properties: {
      question: {
        type: Schema.types.string,
        name: "question",
      },
      channel_id: {
        type: Schema.types.string,
        name: "channel_id",
      },
    },
    required: ["question", "channel_id"],
  },
});

APIPermitWebhookWorkflow.addStep(
  AskPermissionMessage,
  {
    channel_id: APIPermitWebhookWorkflow.inputs.channel_id,
    question: APIPermitWebhookWorkflow.inputs.question,
  },
);
export default APIPermitWebhookWorkflow;
