import { WsHandler } from "./types/ws-handler";
import { WsIncomingMessage } from "./types/ws-message";
import { Logger } from "@tshio/logger";

interface WsHandlersDependencies {
  logger: Logger;
  handlers: { [key: string]: WsHandler };
}

export class WsHandlers {
  constructor(private dependencies: WsHandlersDependencies) {}

  handle(message: WsIncomingMessage) {
    if (this.dependencies.handlers[message.type]) {
      this.dependencies.handlers[message.type].handle(message);
    } else {
      this.dependencies.logger.warn(`Unknown message: %o`, message);
    }
  }
}
