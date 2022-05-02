import { Query } from "@tshio/query-bus";

export const GET_USERS_QUERY_TYPE = "users/GET_USERS";

export interface GetUsersQueryPayload {}

export class GetUsersQuery implements Query<GetUsersQueryPayload> {
  public type: string = GET_USERS_QUERY_TYPE;

  constructor(public payload: GetUsersQueryPayload) {}
}
