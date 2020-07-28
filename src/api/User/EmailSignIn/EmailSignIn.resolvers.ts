import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

// 내가 얻은 이메일로 사용자 찾기
const resolvers:Resolvers = {   
    Mutation: {
        EmailSignIn: async(_,args: EmailSignInMutationArgs): Promise<EmailSignInResponse> =>{
            const{email,password} = args;
            try{
                const user = await User.findOne({email});
                if (!user) {
                  return {
                    ok: false,
                    error: "No User found with that email",
                    token: null,
                  };
                }
                // email 인증은 password도 비교해주어야 함
                // password compare codes
                const checkPassword = await user.comparePassword(password);
                if(checkPassword){
                    const token = createJWT(user.id);
                    return{
                        ok:true,
                        error: null,
                        token
                    }
                }else{
                    return{
                        ok: false,
                        error: "Wrong password",
                        token: null
                    }
                }
            } catch(error){
                return{
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
};

export default resolvers;