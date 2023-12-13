import http from "http";
import mongoose from "mongoose";
import app from "./app/app";
import config from "./config";

const server = http.createServer(app);

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("DB connected Successfully");
    server.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
