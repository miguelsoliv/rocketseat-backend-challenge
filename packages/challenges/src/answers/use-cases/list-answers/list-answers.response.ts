import { Answer } from '@infra/models';
import { ObjectType } from '@nestjs/graphql';
import { PaginatedDataResponse } from '../../../shared/dtos';

@ObjectType()
export class PaginatedAnswers extends PaginatedDataResponse(Answer) {}
