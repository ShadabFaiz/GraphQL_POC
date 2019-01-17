import 'reflect-metadata';

import { ObjectID } from 'mongodb';
import { getManager, getMongoManager, getMongoRepository } from 'typeorm';

import { User } from '../../entities/User/User';

export class UserDao {
  private static instance: UserDao;


  public static getInstance(): UserDao {
    if (!UserDao.instance) UserDao.instance = new UserDao();
    return UserDao.instance;
  }

  public async create(user: User): Promise<User> {
    return getMongoManager().save(user);
  }

  // private async createProfile(userProfile: UserProfile): Promise<UserProfile> {
  //   return getMongoManager().save(userProfile);
  // }

  public async findById(_id: ObjectID): Promise<User> {
    console.log('Finding user id:' + _id);
    return getMongoRepository(User).findOne({ where: { _id } });
  }

  public finUsers(parameter?: any) {
    console.log(parameter);
    return parameter ? getMongoRepository(User).find(parameter) : getMongoRepository(User).find({});
  }

  // public findAll(): Promise<User[]> {
  //   return getMongoManager().find(User);
  // }

  // public findByUserName(username: string): Promise<User> {
  //   return getMongoManager().findOne(User, { username });
  // }

  public findUserByEmail(emailId: string): Promise<User> {
    return getManager().findOne(User, { emailId });
  }

  public async getUserProfile(_id: ObjectID): Promise<User> {
    return getMongoRepository(User).findOne({ where: { _id } });
  }

  public async update(newUserData: User) {
    return getMongoManager().save(newUserData);
  }

  // public async updateProfile(profile: User): Promise<User> {
  //   return getRepository(User).save(profile);
  // }

  // public async isUserActive(user: User): Promise<boolean> {
  //   let uvs = await getMongoManager().findOne(UserVerificationStatus, {
  //     userId: user.userId
  //   });
  //   return uvs && uvs.verified ? true : false;
  // }

  public async getCredential(userId: ObjectID): Promise<User> {
    return getMongoManager().findOne(User, { userId });
  }

  public deleteUser(userId: ObjectID): Promise<any> {
    return getMongoRepository(User).delete({ userId });
  }
}
