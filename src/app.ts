import cors from "cors";
import {GraphQLServer} from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import {NextFunction,Response} from "express";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema: schema,
      context: {
        teacher: "nicolas"
      }
    });
    this.middlewares();
  }
  // 바로 시작되는 곳
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    // get으로 header에서 token을 꺼내고 -> X-JWT 등 지정한 name으로 꺼내옴
    if (token) {
      const user = await decodeJWT(token);
      // decodeJWT로 아이디가 일치한 유저를 찾음
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;

// express server