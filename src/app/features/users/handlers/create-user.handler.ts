import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import StatusCodes from "http-status-codes";
import { Repository } from "typeorm";
import { HttpError } from "../../../../errors/http.error";
import { CREATE_USER_COMMAND_TYPE, CreateUserCommand } from "../commands/create-user.command";
import { UsersModel } from "../models/users.model";

export interface CreateUserHandlerDependencies {
  logger: Logger;
  usersRepository: Repository<UsersModel>;
}

export default class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  public commandType: string = CREATE_USER_COMMAND_TYPE;

  constructor(private dependencies: CreateUserHandlerDependencies) {}

  async execute(command: CreateUserCommand) {
    const { usersRepository } = this.dependencies;
    const { name, code, authorized } = command.payload;

    const existingUser = await usersRepository.findOne({
      where: { code },
    });

    if (existingUser) {
      throw new HttpError(`User with the code ${code} already exists`, StatusCodes.CONFLICT);
    }

    const user = await usersRepository.save(
      UsersModel.create({
        name,
        code,
        authorized,
        unknown: false,
      }),
    );

    return {
      result: user,
    };
  }
}
