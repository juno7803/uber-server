import { Resolvers } from "src/types/resolvers";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ):Promise<CompletePhoneVerificationResponse> => {
      const {phoneNumber, key} = args;
      try{
        const verification = await Verification.findOne({
            payload: phoneNumber,
            key
        });
        if(!verification){
            return{
                ok: false,
                error: "Verification key not valid",
                token: null
            };
        }else{
            verification.verified = true;
            verification.save();
        }
      }catch(error){
        return{
            ok: false,
            error: error.message,
            token: null
        };
      }

      try{
        const user = await User.findOne({phoneNumber});
        if(user){
            user.verifiedPhoneNumber = true;
            user.save();
            const token = createJWT(user.id);
            return{
                ok: true,
                error: null,
                token
            };
        }else{
            return{
                ok: true,
                error: null,
                token: null
            }
        }
      }catch(error){
        return{
            ok: false,
            error: error.message,
            token: null
        }
      }
    },
  },
};

export default resolvers;


// # 폰 인증시, 이미 가입된 번호에 대해서는 바로 로그인이 될 수 있어야 하고,
// # 그렇지 않다면 그대로 가입 진행

// # 어떤 유저의 폰 번호가 인증되고, 우리가 db에서 그 사람을 찾으면 우리는 그 사람을 고정해 둘 것