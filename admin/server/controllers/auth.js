import Controller from '../base/controller';
import UserModel from '../../client/models/user';


export default class AuthController extends Controller {
  login (req, res, next) {
    if (req.session.token) {
      return res.json({ sucess: true });
    }

    let { token } = req.body;
    let user = new UserModel();
    user.username = 'profile';
    user.security = { token: token };

    let dfd = user.fetch();

    dfd.done(() => {
      req.session.token = token;
      res.json({ sucess: true });
    });

    dfd.fail(() => {
      this.error(res, 'bad_token', 401);
    });
  }

  logout (req, res, next) {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.json({ sucess: true });
    });
  }

  router () {
    this.post('/auth/login', this.login);
    this.get('/auth/logout', this.logout);
  }
}
