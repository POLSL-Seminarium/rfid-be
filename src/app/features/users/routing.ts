import * as express from "express";
import { Action } from "../../../shared/http/types";

import { createUserActionValidation } from "./actions/create-user.action";
import { updateUserActionValidation } from "./actions/update-user.action";
import { getUsersActionValidation } from "./actions/get-users.action";
import { getUserActionValidation } from "./actions/get-user.action";
import { userAccessActionValidation } from "./actions/user-access.action";
import { getUserLogsActionValidation } from "./actions/get-user-logs.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  createUserAction: Action;
  updateUserAction: Action;
  getUsersAction: Action;
  getUserAction: Action;
  userAccessAction: Action;
  getUserLogsAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/", [createUserActionValidation], actions.createUserAction.invoke.bind(actions.createUserAction));
  router.patch("/", [updateUserActionValidation], actions.updateUserAction.invoke.bind(actions.updateUserAction));
  router.get("/", [getUsersActionValidation], actions.getUsersAction.invoke.bind(actions.getUsersAction));
  router.get(
    "/user-access",
    [userAccessActionValidation],
    actions.userAccessAction.invoke.bind(actions.userAccessAction),
  );
  router.get("/:id", [getUserActionValidation], actions.getUserAction.invoke.bind(actions.getUserAction));
  router.get(
    "/:id/logs",
    [getUserLogsActionValidation],
    actions.getUserLogsAction.invoke.bind(actions.getUserLogsAction),
  );
  // ACTIONS_SETUP

  return router;
};
