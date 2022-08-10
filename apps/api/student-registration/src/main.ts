import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import dataSource from './database/ormconfig';

const logger = new Logger();

dataSource.initialize().then(() => {
  logger.log("Database connected.")
}).catch((error) => {
    logger.error(error)
})

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: process.env.PORT
    }
  });
  app.listen().then(() => {
    logger.log("Student registration is listening")
  });
}
bootstrap();
