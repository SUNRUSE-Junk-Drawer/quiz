import { EventHandler } from "@endless-trash/event-handler";
import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostOutput } from "@endless-trash/websocket-host";
import { EventHandlerInput } from "./event-handler-input";

export const eventHandler: EventHandler<
  EventHandlerInput,
  WebsocketHostOutput
> = async (event) => {
  const videoUrl = await event.media.getUrl(
    `996c5a34c3465cf655b526f8035c38b0a464c2632056f70c7a93d886362db820`
  );

  if (videoUrl.type !== `successful`) {
    throw new Error(`Failed to get video.`);
  }

  const audioUrl = await event.media.getUrl(
    `e89eef81c9eba3eb7ec06b2583eaaf0008ced3742d9a55994f76886e2de952e2`
  );

  if (audioUrl.type !== `successful`) {
    throw new Error(`Failed to get audio.`);
  }

  const imageUrl = await event.media.getUrl(
    `dc5ac5fdbcc88feed002a3efaa6e03ed6b718af296102a2f64a7b00966f28ba6`
  );

  if (imageUrl.type !== `successful`) {
    throw new Error(`Failed to get image.`);
  }

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
              {
                type: `video`,
                sources: [
                  {
                    mimeType: `audio/mpeg`,
                    url: videoUrl.url,
                  },
                ],
                name: `Test Video`,
                autoplay: true,
                loop: true,
              },
              {
                type: `audio`,
                sources: [
                  {
                    mimeType: `audio/mpeg`,
                    url: audioUrl.url,
                  },
                ],
                name: `Test Audio`,
                autoplay: false,
                loop: false,
              },
              {
                type: `image`,
                name: `Test Image`,
                description: `Test Description`,
                url: imageUrl.url,
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
