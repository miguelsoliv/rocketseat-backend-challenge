import { ObjectType } from '@nestjs/graphql';
import { Answer } from '@core/answers/answer.model';
import { PaginationResponse } from '../../common';

@ObjectType()
export class ListAnswersResponse extends PaginationResponse(Answer) {}
