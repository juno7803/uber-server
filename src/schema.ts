// schema 파일에서는 , api 폴더 안의 모든 폴더들을 살펴본 후
import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";
import {fileLoader,mergeResolvers,mergeTypes} from "merge-graphql-schemas";
import * as path from "path";

