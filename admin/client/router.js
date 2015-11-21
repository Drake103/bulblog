import BaseRouter from './base/router';
import vent from './modules/vent';
import currentUser from './stores/current_user';


export default class Router extends BaseRouter {
  run () {
    super.run();
    vent.on('user:signin', () => this.routeTo('/'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  middleware () {
    //this.use(/^((?!(\/signin|\/signup)).)*$/, this.auth);
  }

  redirect () {

  }

  router () {
    this.route('/', 'dashboard.index');
    this.route('/dashboard', 'dashboard.index');
    this.route('/posts', 'post.list');
    this.route('/posts/:slug', 'post.card');

    this.route('/signin', 'session.signin');
    this.route('/signup', 'session.signup');
    this.route('/signout', 'session.signout');
  }
}

Router.prototype.controllers = {
  dashboard: require('./controllers/dashboard'),
  post: require('./controllers/post'),
  session: require('./controllers/session'),
};

Router.prototype.auth = require('./middlewares/auth');
Router.prototype.notAuth = require('./middlewares/not_auth');
