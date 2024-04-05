import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

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
    },
    required: ["question"],
  },
});

export default APIPermitWebhookWorkflow;
