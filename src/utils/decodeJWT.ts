/* 
    1. open token 
    2. find userId (token안에 있던 id와 일치하는 id)
    3. middleware에 다시 줌
*/
import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string) :Promise<User|undefined>=> {
    try{
        const decoded:any = jwt.verify(token,process.env.JWT_TOKEN || "");
        const {id} = decoded;
        const user = await User.findOne({id});
        return user
    }catch(error){
        return undefined;
    }
};

export default decodeJWT;