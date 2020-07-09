import { Greeting } from "../../../types/graph";

const resolvers = {
    Query:{
        sayHello: () : Greeting => {
            return{
                error: false,
                text: "love you",
            }
        }
    }
}

export default resolvers;

// resolver에서 return 하는 것을 쿼리에서 타입을 지정함