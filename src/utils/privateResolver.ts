// resolver Middleware -> resolver를 보호하기 위함
// user를 못찾으면, Error 발생
// user를 찾으면 resolverFunction 반환
const privateResolver = (resolverFunction) => async (
    parent,
    args,
    context,
    info
    ) => {privateResolver
    if(!context.req.user){
        throw new Error("NO JWT, I refuse to proceed");
    }
    const resolved = await resolverFunction(parent,args,context,info);
    return resolved;
};

export default privateResolver;
// psql setting