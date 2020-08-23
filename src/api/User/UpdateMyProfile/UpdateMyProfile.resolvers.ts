import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateMyProfileMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers:Resolvers={
    Mutation:{
        UpdateMyProfile: privateResolver(async(_,args:UpdateMyProfileMutationArgs,{req})=>{
            const user: User = req.user;
            try{
                if(args.password !== null){
                    user.password = args.password;
                    user.save();
                }
                return{
                    ok: true,
                    error: null
                };
            }catch(error){
                return{
                    ok: false,
                    error: error.message
                };
            }
        })
    }
};

export default resolvers;