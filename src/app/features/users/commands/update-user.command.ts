import { Command } from "@tshio/command-bus";

export const UPDATE_USER_COMMAND_TYPE = "users/UPDATE_USER";

export interface UpdateUserCommandPayload {
  id: string;
  name?: string;
  code?: string;
  authorized?: string;
}

export class UpdateUserCommand implements Command<UpdateUserCommandPayload> {
  public type: string = UPDATE_USER_COMMAND_TYPE;

  constructor(public payload: UpdateUserCommandPayload) {}
}
