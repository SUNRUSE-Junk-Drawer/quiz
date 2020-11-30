import { hostApiGatewayLambdaWebsocketEventHandler } from "@endless-trash/api-gateway-lambda-websocket-host";
import { eventHandler } from "../../../server";

export const handler = hostApiGatewayLambdaWebsocketEventHandler<
  Record<string, unknown>
>({}, {}, eventHandler);
