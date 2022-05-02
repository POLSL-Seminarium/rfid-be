import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { UsersModel } from "../models/users.model";
import { GET_USERS_QUERY_TYPE, GetUsersQuery, GetUsersQueryResult } from "../queries/get-users";

export interface GetUsersQueryHandlerDependencies {
  usersRepository: Repository<UsersModel>;
}

export default class GetUsersQueryHandler implements QueryHandler<GetUsersQuery, GetUsersQueryResult> {
  public queryType: string = GET_USERS_QUERY_TYPE;

  constructor(private dependencies: GetUsersQueryHandlerDependencies) {}

  async execute(_query: GetUsersQuery): Promise<GetUsersQueryResult> {
    const { usersRepository } = this.dependencies;

    const users = await usersRepository.find();

    return new GetUsersQueryResult(users);
  }
}
