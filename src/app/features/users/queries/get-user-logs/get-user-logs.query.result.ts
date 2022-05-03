import { QueryResult } from "@tshio/query-bus";

export class GetUserLogsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
