import { hostApiGatewayLambdaWebsocketEventHandler } from "@endless-trash/api-gateway-lambda-websocket-host";
import { eventHandler } from "../../../server";

export const handler = hostApiGatewayLambdaWebsocketEventHandler<
  Record<string, unknown>
>(
  {
    endpoint: `https://uuy1wli1f1.execute-api.eu-west-1.amazonaws.com/production`,
  },
  {},
  eventHandler
);
