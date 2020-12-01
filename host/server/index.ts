import { EventHandler } from "@endless-trash/event-handler";
import { Prompt } from "@endless-trash/prompt";
import {
  WebsocketHostInput,
  WebsocketHostOutput,
} from "@endless-trash/websocket-host";

export const eventHandler: EventHandler<
  WebsocketHostInput,
  WebsocketHostOutput
> = async (event) => {
  const prompt: Prompt = {
    formGroups: [
      {
        name: `Test Form Group`,
        forms: [
          {
            name: `Test Form`,
            submitButtonLabel: `Test Submit Button Label`,
            fields: [
              {
                type: `title`,
                name: `Test Title Field`,
                content: `Test Title Content`,
              },
              {
                type: `subtitle`,
                name: `Test Subtitle Field`,
                content: `Test Subtitle Content`,
              },
              {
                type: `paragraph`,
                name: `Test Paragraph Field`,
                content: `Test Paragraph Content`,
              },
              {
                type: `string`,
                name: `Test String Field`,
                label: `Test String Label`,
                minimumLength: 5,
                maximumLength: 25,
                value: ``,
              },
              {
                type: `integer`,
                name: `Test Integer Field`,
                label: `Test Integer Label`,
                minimum: [5, `inclusive`],
                maximum: [20, `inclusive`],
                value: null,
                required: true,
              },
              {
                type: `float`,
                name: `Test Float Field`,
                label: `Test Float Label`,
                minimum: [5, `inclusive`],
                maximum: [20, `inclusive`],
                value: null,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  };

  return {
    messages: [
      {
        sessionId: event.sessionId,
        body: JSON.stringify(prompt),
      },
    ],
  };
};
