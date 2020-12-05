import { hostApiGatewayLambdaWebsocketEventHandler } from "@endless-trash/api-gateway-lambda-websocket-host";
import { S3FileStore } from "@endless-trash/s3-file-store";
import { eventHandler } from "../../../server";
import { EventHandlerInput } from "../../../server/event-handler-input";

export const handler = hostApiGatewayLambdaWebsocketEventHandler<EventHandlerInput>(
  {
    endpoint: `https://uuy1wli1f1.execute-api.eu-west-1.amazonaws.com/production`,
  },
  {
    media: new S3FileStore({
      bucketName: `sunruse-quiz-media`,
      clientConfiguration: {},
    }),
  },
  eventHandler
);
