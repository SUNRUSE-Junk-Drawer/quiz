import { FileStore } from "@endless-trash/file-store";
import { WebsocketHostInput } from "@endless-trash/websocket-host";

export type EventHandlerInput = WebsocketHostInput & {
  readonly media: FileStore;
};
