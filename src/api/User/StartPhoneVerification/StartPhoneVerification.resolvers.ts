import { Resolvers } from "../../../types/resolvers";
import { StartPhoneVerificationMutationArgs, StartPhonVerificationResponse } from "src/types/graph";
import Verification from "../../../entities/Verification"
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhonVerificationResponse> => {
        const {phoneNumber} = args;
        try{
            const existingVerification = await Verification.findOne({
                payload: phoneNumber
            });
            if(existingVerification){
                existingVerification.remove();
            }//
            const newVerification = await Verification.create({
              payload: phoneNumber,
              target: "PHONE"
            }).save(); // key는 자동으로 생성됨
            // to do: send sms
            await sendVerificationSMS(newVerification.payload,newVerification.key);
            return{
              ok: true,
              error: null
            }
        }catch(error){
            return{
                ok: false,
                error: error.message
            }
        }
    },
  },
};

export default resolvers;
// 요기서 Verification 모델을 생성할 것임 -> Verification.ts로 이동