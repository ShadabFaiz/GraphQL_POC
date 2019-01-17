
export class UserSchema {

    private static readonly schema = `
    type User {
        username: String,
        firstname: String,
        lastname: String,
        emailId: String,
        gender: String,
        age: Int,
        userId: String
        },
    input userInput {
        username: String!,
        firstname: String!,
        lastname: String!,
        emailId: String!,
        gender: String!,
        age: Int!
    }
    enum user_type {
        user1
        user2
        user3
    }
    `;

    public static getUserSchema() {
        return UserSchema.schema;
    }
}