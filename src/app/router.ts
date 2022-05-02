import * as express from "express";

export interface RoutingDependencies {
  usersRouting: express.Router;
  logsRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  logsRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", usersRouting);
  router.use("/logs", logsRouting);
  // ROUTES_CONFIG
  return router;
};
