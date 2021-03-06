import { AwilixContainer, asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import LoginHandler from "../app/features/example/handlers/login.handler";
import DeleteUserHandler from "../app/features/example/handlers/delete-user.handler";
import CreateUserCommandHandler from "../app/features/users/handlers/create-user.handler";
import UpdateUserCommandHandler from "../app/features/users/handlers/update-user.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      asClass(LoginHandler),
      asClass(DeleteUserHandler),
      asClass(CreateUserCommandHandler),
      asClass(UpdateUserCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
