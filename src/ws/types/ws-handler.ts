import { WsIncomingMessage } from "./ws-message";

export interface WsHandler {
  handle: (message: WsIncomingMessage) => Promise<any>;
}
