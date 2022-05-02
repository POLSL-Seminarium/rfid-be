import { QueryResult } from "@tshio/query-bus";

export class GetUserQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
