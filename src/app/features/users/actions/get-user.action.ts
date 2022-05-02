import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "@tshio/query-bus";
import { GetUserQuery } from "../queries/get-user";
import { Action } from "../../../../shared/http/types";

export interface GetUserActionDependencies {
  queryBus: QueryBus<any>;
}

export const getUserActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class GetUserAction implements Action {
  constructor(private dependencies: GetUserActionDependencies) {}

  @ApiOperationGet({
    path: "/users/{id}",
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
      new GetUserQuery({
        id: req.params.id,
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetUserAction;
