import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { HttpError } from "../../../../errors/http.error";
import { LogsModel } from "../../logs/models/logs.model";
import { UsersModel } from "../models/users.model";
import { USER_ACCESS_QUERY_TYPE, UserAccessQuery, UserAccessQueryResult } from "../queries/user-access";
import { v4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import { Subject } from "rxjs";
import { WsOutgoingMessage } from "../../../../ws/types/ws-message";

export interface UserAccessQueryHandlerDependencies {
  logger: Logger;
  usersRepository: Repository<UsersModel>;
  logsRepository: Repository<LogsModel>;
  messagesToSocketStream: Subject<any>;
}

const generateUnknownName = () => `unknown-${v4().split("-")[0]}`;

export default class UserAccessQueryHandler implements QueryHandler<UserAccessQuery, UserAccessQueryResult> {
  public queryType: string = USER_ACCESS_QUERY_TYPE;

  constructor(private dependencies: UserAccessQueryHandlerDependencies) {}

  async execute(query: UserAccessQuery): Promise<UserAccessQueryResult> {
    const { usersRepository, logsRepository, messagesToSocketStream } = this.dependencies;
    const { code } = query.payload;

    const user = await usersRepository.findOne({
      where: {
        code,
      },
    });

    if (!user) {
      const newUser = await usersRepository.save(
        UsersModel.create({
          code,
          name: generateUnknownName(),
          authorized: false,
          unknown: true,
        }),
      );

      const log = await logsRepository.save(
        LogsModel.create({
          user: newUser,
          authorized: false,
        }),
      );

      this.publicNewLog({
        ...log,
        user: newUser,
      });

      throw new HttpError(`Unauthorized`, StatusCodes.UNAUTHORIZED);
    }

    if (!user.authorized) {
      const log = await logsRepository.save(
        LogsModel.create({
          user,
          authorized: false,
        }),
      );

      this.publicNewLog({
        ...log,
        user,
      });

      throw new HttpError(`Unauthorized`, StatusCodes.UNAUTHORIZED);
    }

    const log = await logsRepository.save(
      LogsModel.create({
        user,
        authorized: true,
      }),
    );

    this.publicNewLog({
      ...log,
      user,
    });

    return new UserAccessQueryResult({});
  }

  private publicNewLog(log: LogsModel) {
    const wsOutgoingMessage: WsOutgoingMessage = {
      targetType: "ALL",
      target: [],
      type: "user-log",
      payload: {
        log,
      },
    };

    this.dependencies.messagesToSocketStream.next(wsOutgoingMessage);
  }
}
