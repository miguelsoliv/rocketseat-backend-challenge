import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { env } from './infra/config';
import { AnswerStatus } from './shared/constants';
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

  registerEnumType(AnswerStatus, { name: 'AnswerStatus' });

  await app.listen(env.PORT, () => {
    console.info(`[‼] Server started at port ${env.PORT}!`);
  });
}
bootstrap();
