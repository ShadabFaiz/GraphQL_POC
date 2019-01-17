import { Request, Response } from 'express';
import { GraphQLParams } from 'express-graphql';
import { buildSchema } from 'graphql';

import { UserResolver } from '../Resolvers/UserResolvers';
import { UserSchema } from './UserSchema';

// import * as sc from '../schemas/'

export class SchemaManager {
    private readonly schema = buildSchema(`
        ${UserSchema.getUserSchema()},
    type Query {
      "Returns a greeting"
      hello: String,
      "Return a number"
      bye: Int,

      "Get users depending upon the paramters"
      users(take: Int!,firstname: String, gender: String): [User!],
    },

    "List of Mutations available"
    type Mutation {
        "Create a User"
        createUser(user: userInput): User
    }
  `);

    private readonly root = {
        hello: () => 'Heeelloo',
        bye: () => 123,
        ...UserResolver.getResolver()
    };

    get SCHEMAS() {
        return this.schema;
    }

    get ROOT() {
        return this.root;
    }

    public static getROOT(request: Request, response: Response, params: GraphQLParams) {
        request = request;
        response = response;
        console.log('params:=', params);
        return;
    }

}