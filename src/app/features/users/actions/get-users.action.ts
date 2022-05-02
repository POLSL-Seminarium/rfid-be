import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "@tshio/query-bus";
import { GetUsersQuery } from "../queries/get-users";
import { Action } from "../../../../shared/http/types";

export interface GetUsersActionDependencies {
  queryBus: QueryBus<any>;
}

export const getUsersActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class GetUsersAction implements Action {
  constructor(private dependencies: GetUsersActionDependencies) {}

  @ApiOperationGet({
    path: "/users/",
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
      new GetUsersQuery({
        // query props
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetUsersAction;
