import { UserDao } from '../dao/User/UserDao';
import { User } from '../entities/User/User';
import { UserMapUtil } from '../util/User/UserMapUtil';

export class UserResolver {

    public static getResolver() {
        let users = UserResolver.SearchUser;
        let createUser = UserResolver.createUser;
        return { users, createUser };
    }

    private static async SearchUser(parameter?: any): Promise<User[]> {
        console.log(parameter);
        let dao = UserDao.getInstance();
        let users = Object.keys(parameter).length > 0 ? await dao.finUsers(parameter) : await dao.finUsers();
        users = UserResolver.convertUserIdToString(users);
        return users;
    }

    private static async createUser(parameter?: any) {
        console.log('create User', parameter);
        let dao = UserDao.getInstance();
        let mappedUser = await UserMapUtil.mapUser(parameter['user']);
        let userCreated = await dao.create(mappedUser);
        return userCreated;
    }

    private static convertUserIdToString(users: User[]): User[] {
        return users.map(user => {
            user.userId = user.userId.toString();
            return user;
        });
    }
}