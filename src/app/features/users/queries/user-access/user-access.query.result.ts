import { QueryResult } from "@tshio/query-bus";

export class UserAccessQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
