type WsMessageType = string;

export interface WsOutgoingMessage {
  targetType: "ALL" | "CUSTOM";
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
