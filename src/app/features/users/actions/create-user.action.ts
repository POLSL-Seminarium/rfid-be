import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "@tshio/command-bus";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CreateUserCommand } from "../commands/create-user.command";
import { Action } from "../../../../shared/http/types";

export interface CreateUserActionDependencies {
  commandBus: CommandBus;
}

export const createUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      name: Joi.string().min(1).max(20).required(),
      code: Joi.string().min(1).max(100).required(),
      authorized: Joi.boolean().required(),
    },
  },
  { abortEarly: false, stripUnknown: true },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class CreateUserAction implements Action {
  constructor(private dependencies: CreateUserActionDependencies) {}

  @ApiOperationPost({
    path: "/users",
    description: "Description",
    parameters: {},
    responses: {
      200: {
        description: "Success",
      },
      400: {
        description: "Validation error",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  })
  async invoke({ body }: Request, res: Response) {
    const commandResult = await this.dependencies.commandBus.execute(new CreateUserCommand(body));

    res.json(commandResult.result);
  }
}
export default CreateUserAction;
