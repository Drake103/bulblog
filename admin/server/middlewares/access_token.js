import UserModel from '../../client/models/user';
import { wrapModel } from '../mixins/isomorphic_controller';
import error from './error';


export default function (req, res, next) {
  if (!req.session.token) {
    return next();
  } else {
    let user = new UserModel();
    user.username = 'profile';
    user.security = { token: req.session.token };

    let dfd = user.fetch();

    dfd.done(() => {
      req.user = user.toJSON();
      req.user.token = req.session.token;
      req.authorized = true;
      next();
    });

    dfd.fail(() => {
      error(res, 'bad_token', 401);
    });
  }
}
