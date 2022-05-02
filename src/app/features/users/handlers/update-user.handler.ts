import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { NotFoundError } from "../../../../errors/not-found.error";
import { UPDATE_USER_COMMAND_TYPE, UpdateUserCommand } from "../commands/update-user.command";
import { UsersModel } from "../models/users.model";

export interface UpdateUserHandlerDependencies {
  logger: Logger;
  usersRepository: Repository<UsersModel>;
}

export default class UpdateUserHandler implements CommandHandler<UpdateUserCommand> {
  public commandType: string = UPDATE_USER_COMMAND_TYPE;

  constructor(private dependencies: UpdateUserHandlerDependencies) {}

  async execute(command: UpdateUserCommand) {
    const { usersRepository } = this.dependencies;
    const { id, ...rest } = command.payload;

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(`User of id ${id} not found`);
    }

    const updatedUser = await usersRepository.update(user.id, rest as any);

    this.dependencies.logger.info("Command UpdateUser executed");

    return {
      result: command.payload,
    };
  }
}
