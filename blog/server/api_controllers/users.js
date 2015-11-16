import _ from 'lodash';
import ModelController from '../base/model_controller';
import User from '../models/user';


export default class UsersController extends ModelController {
  constructor () {
    super();
    this.logPrefix = 'users-controller';
    this.urlPrefix = '/users';
    this.Model = User;
    this.actions = ['create', 'get', 'list'];
    this.filterableFields = ['username'];
    this.listFields = ['username', 'email', 'created', 'full_name', 'image_url', '__v'];

    this.create.type = 'post';

    this.get.url = '/:username';
    this.get.auth = true;

    this.list.auth = true;
  }

  get (req, res, next) {
    var username = req.params.username;

    if (username !== 'profile') {
      return this.notFound(res);
    }

    username = req.user.username;

    this.Model.findOne({ username }).lean().exec((err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return this.notFound(res);
      }

      return res.json(user);
    });
  }

  create (req, res, next) {
    if (req.authorized) {
      return this.notFound(res);
    }

    var
      model = new this.Model(req.body);

    model.set({ created: new Date() });

    model.validate((err) => {
      if (err) {
        return this.error(res, err.errors);
      }

      this.Model.findOne({ username: model.username }, (err, doc) => {
        if (err) {
          return next(err);
        }

        if (doc) {
          return this.error(res, 'user_exist', 409);
        }

        model.save(function (err, doc) {
          if (err) {
            return next(err);
          }

          var user = doc.toJSON();
          res.json(user);
        });
      });
    });
  }

  list (...args) {
    super.list(...args);
  }
}
