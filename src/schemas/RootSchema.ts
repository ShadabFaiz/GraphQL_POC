import { Request, Response } from 'express';
import { GraphQLParams } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Brackets, QueryBuilder } from 'typeorm';

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

    // private static readonly root = {
    //     hello: () => 'Heeelloo',
    //     bye: () => 123,
    //     ...UserResolver.getResolver()
    // };

    get SCHEMAS() {
        // let tt =              ;
        // let op: GraphQLSchemaConfig;
        // op.query
        // let rootschema = new GraphQLSchema({
        //     query: { description: 'asdsdasasd'}
        // })
        return this.schema;
    }

    // get ROOT() {
    //     console.log(this.root);
    //     return this.root;
    // }

    public static getROOT(request: Request, response: Response, params: GraphQLParams) {
        request = request;
        response = response;
        console.log('params:=', params);
        return;
    }

    public get() {
        let op = {
            OR: [{ email: { starts_with: 'ja' } }, { email: { ends_with: '.com' } }],
            AND: [{ email: { starts_with: 'ja' } }, { email: { ends_with: '.com' } }],
            email: { contains: 'lowe' }
        };
        let qb: QueryBuilder<any>;
        let filterQuery = this.filterQuery('myQuery ', op);
        console.log('data filtered');
        console.log(filterQuery);
    }

    public filterQuery = (query: any, where: any) => {
        if (!where) {
            return query;
        }

        Object.keys(where).forEach(key => {
            if (key === 'OR') {
                where[key].map((queryArray: any) => {
                    query.orWhere(new Brackets(qb => this.filterQuery(qb, queryArray)));
                });
            } else if (key === 'AND') {
                where[key].map((queryArray: any) => {
                    query.andWhere(new Brackets(qb => this.filterQuery(qb, queryArray)));
                });
            } else {
                const whereArgs = Object.entries(where);

                whereArgs.map(whereArg => {
                    const [fieldName, filters] = whereArg;
                    const ops = Object.entries(filters);

                    ops.map(parameters => {
                        const [operation, value] = parameters;

                        switch (operation) {
                            case 'is': {
                                query.andWhere(`${fieldName} = :isvalue`, { isvalue: value });
                                break;
                            }
                            case 'not': {
                                query.andWhere(`${fieldName} != :notvalue`, { notvalue: value });
                                break;
                            }
                            case 'in': {
                                query.andWhere(`${fieldName} IN :invalue`, { invalue: value });
                                break;
                            }
                            case 'not_in': {
                                query.andWhere(`${fieldName} NOT IN :notinvalue`, {
                                    notinvalue: value
                                });
                                break;
                            }
                            case 'lt': {
                                query.andWhere(`${fieldName} < :ltvalue`, { ltvalue: value });
                                break;
                            }
                            case 'lte': {
                                query.andWhere(`${fieldName} <= :ltevalue`, { ltevalue: value });
                                break;
                            }
                            case 'gt': {
                                query.andWhere(`${fieldName} > :gtvalue`, { gtvalue: value });
                                break;
                            }
                            case 'gte': {
                                query.andWhere(`${fieldName} >= :gtevalue`, { gtevalue: value });
                                break;
                            }
                            case 'contains': {
                                query.andWhere(`${fieldName} ILIKE :convalue`, {
                                    convalue: `%${value}%`
                                });
                                break;
                            }
                            case 'not_contains': {
                                query.andWhere(`${fieldName} NOT ILIKE :notconvalue`, {
                                    notconvalue: `%${value}%`
                                });
                                break;
                            }
                            case 'starts_with': {
                                query
                                    .andWhere(`${fieldName} ILIKE :swvalue`)
                                    .setParameter('swvalue', `${value}%`);
                                break;
                            }
                            case 'not_starts_with': {
                                query
                                    .andWhere(`${fieldName} NOT ILIKE :nswvalue`)
                                    .setParameter('nswvalue', `${value}%`);
                                break;
                            }
                            case 'ends_with': {
                                query.andWhere(`${fieldName} ILIKE :ewvalue`, {
                                    ewvalue: `%${value}`
                                });
                                break;
                            }
                            case 'not_ends_with': {
                                query.andWhere(`${fieldName} ILIKE :newvalue`, {
                                    newvalue: `%${value}`
                                });
                                break;
                            }
                            default: {
                                console.log('default:', operation);
                            }
                        }
                    });
                });
            }
        });

        return query;
    }
}