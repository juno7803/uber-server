import { ConnectionOptions } from "typeorm";
const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "nuber",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"], // 여기 안에 모델 파일들을 저장
  host: process.env.DB_ENDPOINT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "junolee",
  password: process.env.DB_PASSWORD || "wlqgkq7803"
};

export default connectionOptions;

// mod