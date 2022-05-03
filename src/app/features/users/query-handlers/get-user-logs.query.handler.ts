import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { NotFoundError } from "../../../../errors/not-found.error";
import { LogsModel } from "../../logs/models/logs.model";
import { UsersModel } from "../models/users.model";
import { GET_USER_LOGS_QUERY_TYPE, GetUserLogsQuery, GetUserLogsQueryResult } from "../queries/get-user-logs";

export interface GetUserLogsQueryHandlerDependencies {
  usersRepository: Repository<UsersModel>;
  logsRepository: Repository<LogsModel>;
}

export default class GetUserLogsQueryHandler implements QueryHandler<GetUserLogsQuery, GetUserLogsQueryResult> {
  public queryType: string = GET_USER_LOGS_QUERY_TYPE;

  constructor(private dependencies: GetUserLogsQueryHandlerDependencies) {}

  async execute(query: GetUserLogsQuery): Promise<GetUserLogsQueryResult> {
    const { usersRepository, logsRepository } = this.dependencies;
    const { id } = query.payload;

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(`User with an id ${id} not found`);
    }

    const logs = await logsRepository.find({
      where: {
        user: user.id,
      },
    });

    return new GetUserLogsQueryResult(logs);
  }
}
