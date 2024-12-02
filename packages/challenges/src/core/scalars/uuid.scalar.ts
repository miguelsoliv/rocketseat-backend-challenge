import { GraphQLScalarType } from 'graphql';
import { isUUID } from 'class-validator';
import { InvalidUUID } from '@core/errors';

const validate = (uuid: unknown) => {
  if (!isUUID(uuid)) throw new InvalidUUID();

  return uuid;
};

export const UuidScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID validator',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
