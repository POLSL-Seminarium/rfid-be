import * as express from "express";
import { Action } from "../../../shared/http/types";

// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  // ACTIONS_SETUP

  return router;
};
