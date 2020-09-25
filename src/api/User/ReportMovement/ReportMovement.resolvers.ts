import User from "src/entities/User";
import { ReportMovementResponse,ReportMovementMutationArgs } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import cleanNullArgs from "src/utils/cleanNullArgs";
import privateResolver from "src/utils/privateResolver";

const resolvers: Resolvers = {
    Mutation:{
        ReportMovement: privateResolver(async(_,args: ReportMovementMutationArgs, {req}): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try{
               await User.update({id: user.id},{...notNull});
               return {
                   ok: true,
                   error: null
               }
            } catch(error){
                return{
                    ok: false,
                    error: error.message
                };
            }
        })
    }
};

export default resolvers;
