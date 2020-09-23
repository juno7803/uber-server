import User from "src/entities/User";
import { ToggleDrivingModeResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";

const resolvers: Resolvers = {
    Mutation:{
        ToggleDrivingMode : privateResolver(async(_,__, {req}) : Promise<ToggleDrivingModeResponse>=>{
            const user: User = req.user;
            user.isDriving = !user.isDriving;
            user.save();
            return{
                ok: true,
                error: null
            }
        })
    }
}

export default resolvers;