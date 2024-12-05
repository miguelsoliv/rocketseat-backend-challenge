import { ObjectType } from '@nestjs/graphql';
import { Challenge } from '@core/models';
import { PaginatedDataResponse } from '@shared/dtos';

@ObjectType()
export class ListChallengesResponse extends PaginatedDataResponse(Challenge) {}
