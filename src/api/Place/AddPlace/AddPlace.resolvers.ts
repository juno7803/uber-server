import { AddPlaceMutationArgs, AddPlaceResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "src/entities/User";
import Place from "src/entities/Place";
import privateResolver from "src/utils/privateResolver";

const resolvers: Resolvers ={
    Mutaion: {
        AddPlace: privateResolver(async(_, args:AddPlaceMutationArgs, { req }) : Promise<AddPlaceResponse>=> {
            const user: User = req.user;
            try{
                await Place.create({ ...args, user}).save();
                return{
                    ok: true,
                    error: null
                }
            } catch(error){
                return{
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}