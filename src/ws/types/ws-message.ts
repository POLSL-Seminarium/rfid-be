type WsMessageType = string;

export interface WsOutgoingMessage {
  target: string[];
  type: WsMessageType;
  payload: {
    [key: string]: any;
  };
}

export interface WsIncomingMessage {
  type: WsMessageType;
  socketId: string;
  [key: string]: any;
}
