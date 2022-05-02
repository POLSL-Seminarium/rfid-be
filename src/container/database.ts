import { AwilixContainer, asValue } from "awilix";
import { Logger } from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import { ContainerDependencies } from "../container";
import * as db from "../config/db";
import { UsersModel } from "../app/features/users/models/users.model";
import { LogsModel } from "../app/features/logs/models/logs.model";
// MODELS_IMPORTS

export async function registerDatabase(container: AwilixContainer, dependencies?: ContainerDependencies) {
  const dbConnection = dependencies?.connection || (await createConnection(db as ConnectionOptions));

  try {
    await dbConnection.runMigrations();
  } catch (err) {
    (container.cradle.logger as Logger).debug(`Migrations: ${err}`);
  }
  container.register({
    dbConnection: asValue(dbConnection),
    usersRepository: asValue(dbConnection.getRepository(UsersModel)),
    logsRepository: asValue(dbConnection.getRepository(LogsModel)),
    // MODELS_SETUP
  });
}
