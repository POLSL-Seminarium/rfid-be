import { Query } from "@tshio/query-bus";

export const USER_ACCESS_QUERY_TYPE = "users/USER_ACCESS";

export interface UserAccessQueryPayload {
  code: string;
}

export class UserAccessQuery implements Query<UserAccessQueryPayload> {
  public type: string = USER_ACCESS_QUERY_TYPE;

  constructor(public payload: UserAccessQueryPayload) {}
}
