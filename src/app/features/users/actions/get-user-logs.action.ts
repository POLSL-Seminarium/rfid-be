import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "@tshio/query-bus";
import { GetUserLogsQuery } from "../queries/get-user-logs";
import { Action } from "../../../../shared/http/types";

export interface GetUserLogsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getUserLogsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "Users",
})
class GetUserLogsAction implements Action {
  constructor(private dependencies: GetUserLogsActionDependencies) {}

  @ApiOperationGet({
    path: "/users/{id}/logs",
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
      new GetUserLogsQuery({
        id: req.params.id,
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetUserLogsAction;
