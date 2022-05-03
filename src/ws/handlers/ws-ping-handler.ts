import { Subject } from "rxjs";
import { WsHandler } from "../types/ws-handler";
import { WsIncomingMessage, WsOutgoingMessage } from "../types/ws-message";

interface WsPingHandlerDependencies {
  messagesToSocketStream: Subject<any>;
}

export class WsPingHandler implements WsHandler {
  constructor(private dependencies: WsPingHandlerDependencies) {}

  public type = "ping";

  async handle(message: WsIncomingMessage) {
    const { messagesToSocketStream } = this.dependencies;

    const outgoingMessage: WsOutgoingMessage = {
      target: [message.socketId],
      type: this.type,
      payload: {
        result: "pong",
      },
    };

    messagesToSocketStream.next(outgoingMessage);
  }
}

WsPingHandler.prototype.type = "ping";
