import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { env } from './infra/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = env.PORT;

  await app.listen(port, () => {
    console.info(`[‼] Server started at port ${port}!`);
  });
}
bootstrap();
