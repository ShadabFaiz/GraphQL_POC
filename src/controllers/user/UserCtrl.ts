import { ObjectID } from 'mongodb';

import { AWSServiceManger } from '../../services/AWS/AWSServiceManager';
import { UserService } from '../../services/user/UserService';
import { UserMapUtil } from '../../util/UserMapUtil';

export class UserCtrl {
  private static instance: UserCtrl;

  public static getInstance(): UserCtrl {
    if (!UserCtrl.instance) UserCtrl.instance = new UserCtrl();
    return UserCtrl.instance;
  }

  // public async createUser(user: any, profilePic?: Express.Multer.File) {
  //   let saveFileStatus;
  //   let service = UserService.getInstance();
  //   let mappedUser = await UserMapUtil.mapUser(user);
  //   let userCreated = await service.createUser(mappedUser);
  //   console.log('user created');
  //   console.log(user);
  //   if (profilePic) {
  //     saveFileStatus = await service.saveProfilePic(
  //       profilePic,
  //       userCreated.userId
  //     );
  //     userCreated.profilePic = saveFileStatus.Location;
  //   }
  //   console.log(`profile pic saved`);
  //   // return service.updateUser(userCreated, userCreated.userId.toString());
  // }

  public getAllUsers(limit: Number) {
    let service = UserService.getInstance();
    return service.getAllUser(limit);
  }

  public getUserProfile(userId: string) {
    let service = UserService.getInstance();
    let userIDObj = new ObjectID(userId);
    return service.getUserProfile(userIDObj);
  }

  public async updateUserProfile(
    userId: string,
    user?: any,
    profilePic?: Express.Multer.File
  ) {
    let fileSaveStatus;
    let service = UserService.getInstance();
    let mappedUser = await UserMapUtil.mapUser(user);
    let updateUser = await service.updateUser(mappedUser, userId);
    if (profilePic) {
      console.log('saving profile pic');
      fileSaveStatus = await this.saveUserProfilePic(profilePic, userId);
      updateUser.profilePic = fileSaveStatus.Location;
    }
    return service.updateUser(updateUser, updateUser.userId.toString());
  }

  private saveUserProfilePic(profilePic: Express.Multer.File, userId: string) {
    let awsService = AWSServiceManger.getInstance();
    return awsService.saveFile(profilePic, userId);
  }

  public deleteUser(userId: string) {
    let service = UserService.getInstance();
    let userIDObj = new ObjectID(userId);
    return service.deleteUser(userIDObj);
  }

  public updatePassword(
    oldPassword: string,
    new_password: string,
    userId: string
  ) {
    let service = UserService.getInstance();
    let userIDObj = new ObjectID(userId);
    return service.updatePassword(oldPassword, userIDObj, new_password);
  }
}
