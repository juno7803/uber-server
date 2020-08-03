import User from "../../../entities/User";
import { 
    FacebookConnectMutationArgs,
    FacebookConnectResponse 
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import createJWT from "../../../utils/createJWT";

// add
// 파라미터 중 parent는 쓰지 않을 것 이므로, 상관없다 는 의미의 "_" 를 파라미터에 적은 것임
const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
        const {fbId} = args;
        try{
            const existingUser = await User.findOne({fbId});
            // 여기선 리턴값이 User or Undefined 이므로 변수에 할당해주는 식으로 하고, - 여긴 찾는 것(있으면 user 없으면 undefined)
            if(existingUser){
              const token = createJWT(existingUser.id);
                return{
                    ok: true,
                    error: null,
                    token
                }
            }
        } catch(error){
            return{
                ok: false,
                error: error.message,
                token: null
            }
        }
        try{
            const newUser = await User.create({
              ...args,
              profilePhoto: `graph.facebook.com/${fbId}/picture?type=square`,
            }).save();
            // 여긴 리턴값이 없으므로 굳이 적어주지 않았다. - 여긴 생성
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token
            };
        } catch(error){
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }
    },
  },
};

export default resolvers;