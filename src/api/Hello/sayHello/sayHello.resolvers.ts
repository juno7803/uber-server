import {SayHelloResponse,SayHelloQueryArgs} from "../../../types/graph";
const resolvers = {
    Query:{
        sayHello: (_,args: SayHelloQueryArgs) : SayHelloResponse => {
            return{
                error: false,
                text: `Hello ${args.name}`,
                // args만 치면 자동으로 무얼 가져오면 되는지 알려줌
            }
        }
    }
}

export default resolvers;

// resolver에서 return 하는 것을 쿼리에서 타입을 지정함