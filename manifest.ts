import { Manifest } from "deno-slack-sdk/mod.ts";
import QueryAPIWorkflow from "./workflows/submit_issue_interactive.ts";
import APIPermitWebhookWorkflow from "./workflows/api_permit_workflow.ts";
import SampleObjectDatastore from "./datastores/sample_datastore.ts";
import { AskPermissionMessage } from "./functions/ask_permission.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "botifyme",
  description: "A toolkit for building AI agents",
  icon: "assets/default_new_app_icon.png",
  workflows: [QueryAPIWorkflow, APIPermitWebhookWorkflow],
  outgoingDomains: ["unicorn-stirred-radically.ngrok-free.app"],
  datastores: [SampleObjectDatastore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
  functions: [AskPermissionMessage],
});
