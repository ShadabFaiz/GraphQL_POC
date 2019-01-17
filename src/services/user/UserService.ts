import * as bcrypt from 'bcryptjs';
import { ObjectID } from 'mongodb';

import { UserVerificationDao } from '../../dao/security/UserVerificationDao';
import { UserDao } from '../../dao/User/UserDao';
import { User } from '../../entities/User/User';
import { UserVerificationStatus } from '../../entities/User/UserVerificationStatus';
import { SecurityUtils } from '../../util/security/SecurityUtils';
import { UserMapUtil } from '../../util/UserMapUtil';
import { AWSServiceManger } from '../AWS/AWSServiceManager';

export class UserService {
  public static userService: UserService;

  public static getInstance(): UserService {
    if (!UserService.userService) UserService.userService = new UserService();

    return UserService.userService;
  }

  // public async createUser(user: User): Promise<User> {
  //   let userDao = UserDao.getInstance();
  //   user.credential = await bcrypt.hash(
  //     user.credential,
  //     +process.env.PASSWORD_SALT_LENGTH
  //   );

  //   let userExist = await this.doesUsernameExist(user.username);
  //   if (userExist)
  //     return Promise.reject({ status: 409, message: 'Username already exist' });
  //   userExist = await this.doesEmailExist(user.emailId);
  //   if (userExist)
  //     return Promise.reject({ status: 409, message: 'EmailId already exist' });

  //   let userCreated = await userDao.create(user);
  //   // await this.createUserVerification(userCreated);
  //   console.log('User Created');
  //   return userCreated;
  // }

  // private async doesEmailExist(emailId: string) {
  //   let userDao = UserDao.getInstance();
  //   let userNew = await userDao.findUserByEmail(emailId);
  //   return !userNew ? false : true;
  // }
  // private async doesUsernameExist(username: string) {
  //   let userDao = UserDao.getInstance();
  //   let userNew = await userDao.findByUserName(username);
  //   return !userNew ? false : true;
  // }

  // public async saveProfilePic(image: Express.Multer.File, userId: any) {
  //   let awsManager = AWSServiceManger.getInstance();
  //   return awsManager.saveFile(image, userId.toHexString());
  // }

  // public async isUserPresent(user: User): Promise<boolean> {
  //   let userDao = UserDao.getInstance();
  //   let userNew = await userDao.findByUserName(user.username);
  //   return !userNew ? false : true;
  // }

  public getUserProfile(userId: ObjectID) {
    let dao = UserDao.getInstance();
    return dao.getUserProfile(userId);
  }

  public getAllUser(limit: number): Promise<User[]> {
    let dao = UserDao.getInstance();
    return dao.finUsers({ take: limit });
  }

  // public async updateUser(newUserData: User, userId: string) {
  //   let dao = UserDao.getInstance();
  //   let userIDObj = new ObjectID(userId);
  //   let oldUserData = await dao.getUserProfile(userIDObj);
  //   let newMappedUserData = { ...oldUserData, ...newUserData };
  //   let MappedUserData = await UserMapUtil.mapUser(newMappedUserData);
  //   MappedUserData.userId = newMappedUserData.userId;
  //   return dao.update(MappedUserData);
  // }

  // public async deleteUser(userId: ObjectID) {
  //   let dao = UserDao.getInstance();
  //   let userFound = await dao.findById(userId);
  //   if (!userFound)
  //     return Promise.reject({ status: 404, message: 'User not found' });
  //   return dao.deleteUser(userId);
  // }

  // public async updatePassword(
  //   oldpassword: string,
  //   userId: ObjectID,
  //   newPassword: string
  // ) {
  //   let dao = UserDao.getInstance();
  //   let user = await dao.findById(userId);
  //   let status = await SecurityUtils.compareString(
  //     oldpassword,
  //     user.credential
  //   );
  //   if (!status)
  //     return Promise.reject({
  //       status: '401',
  //       message: 'Old password does not match.'
  //     });
  //   user.credential = await bcrypt.hash(
  //     newPassword,
  //     +process.env.PASSWORD_SALT_LENGTH
  //   );
  //   return dao.update(user, userId);
  // }

  // private async createUserVerification(user: User, verified = true) {
  //   let uvsDao = UserVerificationDao.getInstance();
  //   let userVer = new UserVerificationStatus();
  //   userVer.verified = verified;
  //   userVer.userId = user.userId;
  //   userVer.userHash = await bcrypt.hash(
  //     user.username,
  //     +process.env.USER_VERIFICATION_SALT_LENGTH
  //   );
  //   return uvsDao.create(userVer);
  // }
}
