import "regenerator-runtime";
import "core-js/es/promise";
import "./index.sass";
import { jsonWebsocketChannel } from "@endless-trash/json-websocket-channel";
import { domPromptClient } from "@endless-trash/dom-prompt-client";

window.addEventListener(`load`, () => {
  domPromptClient(
    jsonWebsocketChannel(
      `wss://uuy1wli1f1.execute-api.eu-west-1.amazonaws.com/production`
    ),
    { formName: `join`, fields: { code: location.hash.slice(1) } },
    document.getElementById(`root`) as Element
  );
});
