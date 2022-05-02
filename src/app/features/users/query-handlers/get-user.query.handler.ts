import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { NotFoundError } from "../../../../errors/not-found.error";
import { UsersModel } from "../models/users.model";
import { GET_USER_QUERY_TYPE, GetUserQuery, GetUserQueryResult } from "../queries/get-user";

export interface GetUserQueryHandlerDependencies {
  usersRepository: Repository<UsersModel>;
}

export default class GetUserQueryHandler implements QueryHandler<GetUserQuery, GetUserQueryResult> {
  public queryType: string = GET_USER_QUERY_TYPE;

  constructor(private dependencies: GetUserQueryHandlerDependencies) {}

  async execute(query: GetUserQuery): Promise<GetUserQueryResult> {
    const { usersRepository } = this.dependencies;
    const { id } = query.payload;

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(`User of id ${id} not found`);
    }

    return new GetUserQueryResult(user);
  }
}
