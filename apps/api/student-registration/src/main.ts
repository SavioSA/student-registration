import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

const logger = new Logger();

async function bootstrap() {
  console.log(process.env.PORT);
  console.log(process.env.HOSTNAME);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: process.env.PORT
    }
  });
  app.listen().then(() => {
    logger.log("Microservice A is listening")
  });
}
bootstrap();
