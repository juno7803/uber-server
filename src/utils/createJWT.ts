import jwt from "jsonwebtoken";

const createJWT = (id: number): string =>{
    const token = jwt.sign(
    {
        id,
    },
    "h3t7CzefExVMx3s3nfpFa4uyudFMr2BydXeDpCFeZSnR4K8mks");
    return token;
}

export default createJWT;