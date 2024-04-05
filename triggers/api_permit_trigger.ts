import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import APIPermitWebhookWorkflow from "../workflows/api_permit_workflow.ts";

const permitAPI: Trigger<typeof APIPermitWebhookWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "Permit",
  description: "Permit API execution",
  workflow: `#/workflows/${APIPermitWebhookWorkflow.definition.callback_id}`,
  inputs: {
    question: {
      value: "{{data.question}}",
    },
  },
};

export default permitAPI;
