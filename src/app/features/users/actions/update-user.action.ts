import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "@tshio/command-bus";
import { ApiOperationPatch, ApiPath } from "swagger-express-ts";
import { UpdateUserCommand } from "../commands/update-user.command";
import { Action } from "../../../../shared/http/types";

export interface UpdateUserActionDependencies {
  commandBus: CommandBus;
}

export const updateUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      id: Joi.number().min(1).required(),
      name: Joi.string().min(1).max(20).optional(),
      code: Joi.string().min(1).max(100).optional(),
      authorized: Joi.boolean().optional(),
      unknown: Joi.boolean().optional(),
    }).min(2),
  },
  { abortEarly: false, stripUnknown: true },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class UpdateUserAction implements Action {
  constructor(private dependencies: UpdateUserActionDependencies) {}

  @ApiOperationPatch({
    path: "/users/",
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
    const commandResult = await this.dependencies.commandBus.execute(new UpdateUserCommand(body));

    res.json(commandResult.result);
  }
}
export default UpdateUserAction;
