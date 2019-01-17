import { User } from "../../entities/User/User";

export class UserMapUtil {
  public static mapUser(user: any): User {
    let userObj = new User();
    userObj.username = user.username;
    userObj.firstname = user.firstname;
    userObj.lastname = user.lastname;
    userObj.emailId = user.emailId;
    userObj.gender = user.gender;
    userObj.age = user.age;
    return userObj;
  }
}
