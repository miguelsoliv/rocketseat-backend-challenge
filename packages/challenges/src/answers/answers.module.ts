import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [],
})
export class AnswersModule {}
