import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { HttpError } from "../../../../errors/http.error";
import { LogsModel } from "../../logs/models/logs.model";
import { UsersModel } from "../models/users.model";
import { USER_ACCESS_QUERY_TYPE, UserAccessQuery, UserAccessQueryResult } from "../queries/user-access";
import { v4 } from "uuid";
import { StatusCodes } from "http-status-codes";

export interface UserAccessQueryHandlerDependencies {
  logger: Logger;
  usersRepository: Repository<UsersModel>;
  logsRepository: Repository<LogsModel>;
}

const generateUnknownName = () => `unknown-${v4().split("-")[0]}`;

export default class UserAccessQueryHandler implements QueryHandler<UserAccessQuery, UserAccessQueryResult> {
  public queryType: string = USER_ACCESS_QUERY_TYPE;

  constructor(private dependencies: UserAccessQueryHandlerDependencies) {}

  async execute(query: UserAccessQuery): Promise<UserAccessQueryResult> {
    const { usersRepository, logsRepository } = this.dependencies;
    const { code } = query.payload;

    this.dependencies.logger.info("XD: %o", code);

    const user = await usersRepository.findOne({
      where: {
        code,
      },
    });

    this.dependencies.logger.info("%o", user);

    if (!user) {
      const newUser = await usersRepository.save(
        UsersModel.create({
          code,
          name: generateUnknownName(),
          authorized: false,
          unknown: true,
        }),
      );

      await logsRepository.save(
        LogsModel.create({
          user: newUser,
          authorized: false,
        }),
      );

      throw new HttpError(`Unauthorized`, StatusCodes.UNAUTHORIZED);
    }

    if (!user.authorized) {
      await logsRepository.save(
        LogsModel.create({
          user,
          authorized: false,
        }),
      );

      throw new HttpError(`Unauthorized`, StatusCodes.UNAUTHORIZED);
    }

    await logsRepository.save(
      LogsModel.create({
        user,
        authorized: true,
      }),
    );

    return new UserAccessQueryResult({});
  }
}
