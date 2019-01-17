import bodyParser = require('body-parser');
import * as Express from 'express';
import * as graphqlHttp from 'express-graphql';
import * as typeorm from 'typeorm';

import { MockDataManager } from './mockData/MockDataManager';
import { SchemaManager } from './schemas/RootSchema';

class App {

  public express: Express.Application;

  constructor() {
    console.log('Instantiating server');
    this.initializeMiddleware();
  }

  private initializeMiddleware() {
    console.log('Setting up middleware');
    this.express = Express();
    this.express.use(bodyParser.json());
    this.intializeGraphQL();
    this.connectionDatabase();
    this.createRandomUSers();
  }

  private async connectionDatabase() {
    console.log('Connecting to database...');
    try {
      await typeorm.createConnection();
      console.log('database connection successfull');
    } catch (error) {
      console.error('\x1b[31mFailed to connect to database...\x1b[0m');
    }
  }
  private intializeGraphQL() {
    console.log('initializing graphql...');
    let schemaManageer = new SchemaManager();
    // let rootValue = schemaManageer.ROOT;
    let schema = schemaManageer.SCHEMAS;
    // new SchemaManager().get();
    // this.express.use('/graphql', graphqlHttp({
    //   rootValue,
    //   schema,
    //   graphiql: process.env.PRODUCTION !== 'PRODUCTION' ? true : false
    // }));
    this.express.use('/graphql', graphqlHttp(((request: Express.Request, response: Express.Response, param: any) => ({
      rootValue: SchemaManager.getROOT(request, response, param),
      schema,
      graphiql: process.env.PRODUCTION !== 'PRODUCTION' ? true : false
    }))));
  }

  private createRandomUSers() {
    let manager = MockDataManager.getInstance();
    setTimeout(() => {
      if (process.env.CREATE_MOCK_DATA === 'true')
        manager.createRandomUsers(1000000);
    },         3000);
  }

  // private initializeRoutes() {
  //   this.express.use('/api/v1/user', UserRouter.getInstance());

  // }
}

export default new App().express;
