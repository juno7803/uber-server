import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateMyProfileMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }) => {
        const user: User = req.user;
        const notNull = {};
        // null이 아닌 property들만 골라내는 code (#2.56 첨고)
        Object.keys(args).forEach((key) => {
          if (args[key] !== null) {
            notNull[key] = args[key];
          }
        });
        try {
            if(args.password !== null){
                user.password = args.password;
                user.save();
            }
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
