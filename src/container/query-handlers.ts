import { AwilixContainer, asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import UsersQueryHandler from "../app/features/example/query-handlers/users.query.handler";
import GetUsersQueryHandler from "../app/features/users/query-handlers/get-users.query.handler";
import GetUserQueryHandler from "../app/features/users/query-handlers/get-user.query.handler";
import UserAccessQueryHandler from "../app/features/users/query-handlers/user-access.query.handler";
import GetUserLogsQueryHandler from "../app/features/users/query-handlers/get-user-logs.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      asClass(UsersQueryHandler),
      asClass(GetUsersQueryHandler),
      asClass(GetUserQueryHandler),
      asClass(UserAccessQueryHandler),
      asClass(GetUserLogsQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
