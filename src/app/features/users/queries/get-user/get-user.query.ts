import { Query } from "@tshio/query-bus";

export const GET_USER_QUERY_TYPE = "users/GET_USER";

export interface GetUserQueryPayload {
  id: string;
}

export class GetUserQuery implements Query<GetUserQueryPayload> {
  public type: string = GET_USER_QUERY_TYPE;

  constructor(public payload: GetUserQueryPayload) {}
}
