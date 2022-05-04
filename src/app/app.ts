import * as express from "express";
import helmet from "helmet";
import * as cors from "cors";
import * as swagger from "swagger-express-ts";
import { ApolloServer, gql } from "apollo-server-express";
import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";
import { NotFoundError } from "../errors/not-found.error";
import swaggerExpressOptions from "../tools/swagger";
import { Server } from "socket.io";
import { WsHandlers } from "../ws/ws-handlers";
import { Subject } from "rxjs";
import { WsOutgoingMessage } from "../ws/types/ws-message";
import { createServer } from "http";
import { Logger } from "@tshio/logger";

export interface AppDependencies {
  router: express.Router;
  errorHandler: MiddlewareType;
  graphQLSchema: string;
  commandBus: CommandBus;
  queryBus: QueryBus<any>;
  resolvers: any;
  wsHandlers: WsHandlers;
  messagesToSocketStream: Subject<any>;
  logger: Logger;
}

async function createApp({
  router,
  errorHandler,
  graphQLSchema,
  commandBus,
  queryBus,
  resolvers,
  wsHandlers,
  messagesToSocketStream,
  logger,
}: AppDependencies) {
  const typeDefs = gql(graphQLSchema);

  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      commandBus,
      queryBus,
    }),
  });
  await apolloServer.start();

  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    }),
  );
  app.use(helmet.contentSecurityPolicy());
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  app.use("/api-docs", express.static("../swagger"));
  app.use("/api-docs/swagger/assets", express.static("../node_modules/swagger-ui-dist"));
  app.use(swagger.express(swaggerExpressOptions));
  app.use("/api", router);

  apolloServer.applyMiddleware({ app });

  app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
  app.use(errorHandler);

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.onAny((message) => {
      logger.info("Incoming ws message: %o", message);
      wsHandlers.handle({
        socketId: socket.id,
        ...message,
      });
    });
  });

  messagesToSocketStream.subscribe((message: WsOutgoingMessage) => {
    if (message.targetType === "ALL") {
      io.emit("message", {
        type: message.type,
        payload: message.payload,
      });
    } else if (message.targetType === "CUSTOM") {
      message.target.forEach((id) => {
        io.to(id).emit("message", {
          type: message.type,
          payload: message.payload,
        });
      });
    }
  });

  io.listen(1338);

  return app;
}

export { createApp };
