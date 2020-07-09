import {Options} from 'graphql-yoga'; // Option 타입을 import 함!
import app from './app';

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

app.start(appOptions,handleAppStart);
// options 파라미터와 콜백 파라미터를 가진다!

// graphql-yoga server