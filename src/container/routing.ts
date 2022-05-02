import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { usersRouting } from "../app/features/users/routing";
import { logsRouting } from "../app/features/logs/routing";
// ROUTING_IMPORTS

export async function registerRouting(container: AwilixContainer) {
  container.loadModules(["src/app/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: asClass,
    },
  });

  container.register({
    usersRouting: asFunction(usersRouting),
    logsRouting: asFunction(logsRouting),
    // ROUTING_SETUP
  });

  return container;
}
