import * as cors from "cors";
import {GraphQLServer} from "graphql-yoga";
import * as helmet from "helmet";
import * as logger from "morgan";
import schema from "./schema";

class App{
    public app: GraphQLServer;
    constructor(){
        this.app = new GraphQLServer({
            schema: schema
        });
        this.middlewares();
    }
    // 바로 시작되는 곳
    private middlewares = () : void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
    }
}

export default new App().app;

// express server