import * as express from "express";
import { Action } from "../../../shared/http/types";

// VALIDATION_IMPORTS

export interface LogsRoutingDependencies {
  // ACTIONS_IMPORTS
}

export const logsRouting = (actions: LogsRoutingDependencies) => {
  const router = express.Router();

  // ACTIONS_SETUP

  return router;
};
