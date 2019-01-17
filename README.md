# GraphQL_POC
The following repo is a proof of concept built to explore in depth GraphQL. It's built on top of graphql.js and express-graphql.

## Areas Yet To Explore
1. Authentication and Authorization.
2. Usage as Data Access Layer.
3. Custom Logging in the pipeline.

## STEUP AND RUNNING
1. Clone the repo.
2. install the dependencies
    ``` nodejs
    npm install
    ```
3. Start the application
    ``` nodejs
    npm run dev
    ```
4. Browse the url: http://localhost:3000/graphql

## Interesting Queries
Get 10 users.
``` graphQL
query getUsers {
  users(take: 10) {
    firstname
  }
}
```
Create a user.
``` graphQL
mutation create($userData: userInput) {
  createUser(user: $userData){
    firstname
  }
}

{
  "userData": {
    "username": "testing_username",
    "firstname": "testing_firstname",
    "lastname": "testing_lastname",
    "emailId": "eeaassd@gmail.com",
    "gender": "M",
    "age": 12
  }
}
```
Usage of fragments
``` graphQL
query someQuery($gender: String = "M") {
      kingUser: users(take: 5,gender: $gender) {
			...someFragments
  }
}

query secondQuery{
  someUser: users(take:5,firstname: "Shadab",gender: "M") {
    ...someFragments
  } 
}


fragment someFragments on User {
    firstname,
    gender,
    age,
    userId,
    emailId
}
```

## Usage of graphQL as ORM TOOL
Prisma is a library that aims to replace traditional orm tools with the usage of graphQL. Currently they main feature are:
1.  Cross database operations
2.  High-performance data layer
3.  Out-of-the-box CRUD operations
4.  GraphQL subscriptions.

## Additional Resources
*.  GraphQL: https://graphql.github.io/     
*.  Online GraphQL Playground: https://github.com/graphql/graphiql      
*.  Prisma: https://www.prisma.io/      
*.  GraphQL at Faccebook: https://www.youtube.com/watch?v=etax3aEe2dA       
*.  Tutorial on FullStack GraphQL: https://www.howtographql.com/        
