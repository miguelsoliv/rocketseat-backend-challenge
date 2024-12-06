import { ObjectType } from '@nestjs/graphql';
import { Challenge } from '@core/challenges/challenge.model';
import { PaginationResponse } from '../../common';

@ObjectType()
export class ListChallengesResponse extends PaginationResponse(Challenge) {}
