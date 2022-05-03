import { Query } from "@tshio/query-bus";

export const GET_USER_LOGS_QUERY_TYPE = "users/GET_USER_LOGS";

export interface GetUserLogsQueryPayload {
  id: string;
}

export class GetUserLogsQuery implements Query<GetUserLogsQueryPayload> {
  public type: string = GET_USER_LOGS_QUERY_TYPE;

  constructor(public payload: GetUserLogsQueryPayload) {}
}
