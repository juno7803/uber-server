import 'dotenv/config';
// 강의에서 import dotenv from 'dotenv'; 안됨..
import {Options} from 'graphql-yoga'; // Option 타입을 import 함!
import {createConnection}from "typeorm:";
import app from './app';
import connectionOptions from './ormConfig';

// type 정의
const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql"; // type은 string, 값은 "/graphql"
const appOptions : Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint : GRAPHQL_ENDPOINT,
};
// app start에 추가할 옵션!

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions).then(() => {
    app.start(appOptions, handleAppStart);
  });
// #2.9 orm은 ormConfig에서 설정한 옵션들로 db와 앱을 연결해준다.

// options 파라미터와 콜백 파라미터를 가진다!

// graphql-yoga server server
// add