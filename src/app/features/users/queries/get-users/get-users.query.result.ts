import { QueryResult } from "@tshio/query-bus";

export class GetUsersQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
