import { Subject } from "rxjs";
import { Repository } from "typeorm";
import { LogsModel } from "../../app/features/logs/models/logs.model";
import { WsHandler } from "../types/ws-handler";
import { WsIncomingMessage, WsOutgoingMessage } from "../types/ws-message";

interface WsGetUsersLogsHandlerDependencies {
  messagesToSocketStream: Subject<any>;
  logsRepository: Repository<LogsModel>;
}

export class WsGetUsersLogsHandler implements WsHandler {
  constructor(private dependencies: WsGetUsersLogsHandlerDependencies) {}

  public type = "get-users-logs";

  async handle(message: WsIncomingMessage) {
    const { messagesToSocketStream, logsRepository } = this.dependencies;

    const take = message.take || 10;
    const skip = message.skip || 0;

    const [logs, total] = await logsRepository.findAndCount({
      take,
      skip,
      order: {
        id: "ASC",
      },
      join: {
        alias: "logs",
        innerJoinAndSelect: {
          user: "logs.user",
        },
      },
    });

    const outgoingMessage: WsOutgoingMessage = {
      targetType: "CUSTOM",
      target: [message.socketId],
      type: this.type,
      payload: {
        data: logs,
        count: total,
      },
    };

    messagesToSocketStream.next(outgoingMessage);
  }
}

WsGetUsersLogsHandler.prototype.type = "get-users-logs";
