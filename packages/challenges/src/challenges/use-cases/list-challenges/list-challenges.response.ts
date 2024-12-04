import { Challenge } from '@infra/models';
import { ObjectType } from '@nestjs/graphql';
import { PaginatedDataResponse } from '../../../shared/dtos';

@ObjectType()
export class ListChallengesResponse extends PaginatedDataResponse(Challenge) {}
