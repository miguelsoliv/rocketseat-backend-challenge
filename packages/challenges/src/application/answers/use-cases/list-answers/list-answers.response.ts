import { ObjectType } from '@nestjs/graphql';
import { Answer } from '@core/models';
import { PaginatedDataResponse } from '@shared/dtos';

@ObjectType()
export class ListAnswersResponse extends PaginatedDataResponse(Answer) {}
