import { Command } from "@tshio/command-bus";

export const CREATE_USER_COMMAND_TYPE = "users/CREATE_USER";

export interface CreateUserCommandPayload {
  name: string;
  code: string;
  authorized: string;
}

export class CreateUserCommand implements Command<CreateUserCommandPayload> {
  public type: string = CREATE_USER_COMMAND_TYPE;

  constructor(public payload: CreateUserCommandPayload) {}
}
