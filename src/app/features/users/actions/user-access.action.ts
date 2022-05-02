import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "@tshio/query-bus";
import { UserAccessQuery } from "../queries/user-access";
import { Action } from "../../../../shared/http/types";

export interface UserAccessActionDependencies {
  queryBus: QueryBus<any>;
}

export const userAccessActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: Joi.object({
      code: Joi.string().required(),
    }),
  },
  { abortEarly: false, stripUnknown: true },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class UserAccessAction implements Action {
  constructor(private dependencies: UserAccessActionDependencies) {}

  @ApiOperationGet({
    path: "/users/user-access",
    description: "Description",
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
  async invoke(req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new UserAccessQuery({
        code: req.query.code as string,
      }),
    );

    res.json(queryResult.result);
  }
}
export default UserAccessAction;
