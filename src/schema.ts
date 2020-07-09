// schema 파일에서는 , api 폴더 안의 모든 폴더들을 살펴본 후
import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";
import {fileLoader,mergeResolvers,mergeTypes} from "merge-graphql-schemas";
import * as path from "path";
import {IResolvers} from "graphql-middleware/dist/types";

const allTypes:string[] = fileLoader(
    path.join(__dirname,"./api/**/*.graphql")
    // api 폴더안의, 깊이에 상관없이, 모든 폴더들 안에 있는 파일 중, graphql로 끝나는 파일들을 모두 가져옴
);

const allResolvers:IResolvers[] = fileLoader(
    path.join(__dirname,"./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers,
});

export default schema;