import { NextFunction, Request, Response, Router } from 'express';
import passport = require('passport');

import { UserCtrl } from '../../controllers/user/UserCtrl';
import { User } from '../../entities/User/User';

export class UserRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (!UserRouter.router) new UserRouter();

    return UserRouter.router;
  }

  constructor() {
    UserRouter.router = Router();
    this.initialize();
  }

  public getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .getAllUsers(req.params.take)
      .then((list: User[]) => res.send(list))
      .catch((err: any) => this.handleError(err, res));
  }

  public createUser = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .createUser(req.body, req.file)
      .then(result => res.send({ message: 'Account created successfully.' }))
      .catch((err: any) => this.handleError(err, res));
  }

  public updateProfile = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    // console.log(req.file);
    // console.log(req.body);
    ctrl
      .updateUserProfile(req.params.userId, req.body, req.file)
      .then(result => res.send(result))
      .catch((err: any) => this.handleError(err, res));
  }
  public getUserProfile = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    // console.log(req.params.userId ? req.params.userId : req.user._id);
    ctrl
      // .getUserProfile(req.params.userId ? req.params.userId : req.user._id)
      .getUserProfile('5c35f94fd39a681fbf5c0cdb')
      .then(userProfile => {
        res.send(userProfile);
      })
      .catch((err: any) => this.handleError(err, res));
  }
  public deleteUser = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .deleteUser(req.params.userId)
      .then(result => res.send({ message: 'User deleted successfully.' }))
      .catch((err: any) => this.handleError(err, res));
  }

  public updatePassword = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .updatePassword(
        req.body['current_password'],
        req.body['new_password'],
        req.user._id
      )
      .then(update => {
        console.log(`Update password Success.`);
        res.send({ mesasge: 'Password Update Successull.' });
      })
      .catch(err => this.handleError(err, res));
  }

  // private logRequest(req: Request, res: Response, next: NextFunction) {
  //   // info(
  //   //   `${JSON.stringify(req.originalUrl)}, User: ${JSON.stringify(
  //   //     req.user
  //   //   )},  Request Body: ${JSON.stringify(
  //   //     req.body
  //   //   )}, Request Params: ${JSON.stringify(req.params)}`
  //   // );
  //   next();
  // }

  private handleError(err: { status: number; message: string }, res: Response) {
    console.log(err);
    if (err.status) res.status(err.status).send(err.message);
    else res.status(500).send({ message: 'Internal Serve Error' });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  initialize() {
    UserRouter.router.post('/create', this.createUser);

    UserRouter.router.get('/', this.getAllUsers);
    UserRouter.router.get(
      '/profile/:userId?',
      passport.authenticate('jwt', { session: false }),
      this.getUserProfile
    );

    UserRouter.router.put('/update/:userId', this.updateProfile);
    UserRouter.router.delete(
      '/:userId',
      passport.authenticate('jwt', { session: false }),
      this.deleteUser
    );
    UserRouter.router.put(
      '/password',
      passport.authenticate('jwt', { session: false }),
      this.updatePassword
    );
  }
}
