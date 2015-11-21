import React from 'react';
import auth from '../modules/auth';
import Controller from '../base/controller';
import SignupView from '../views/signup';
import SigninView from '../views/signin';

export default class SessionController extends Controller {
  signup(ctx, done) {
    this.renderView(SignupView, done);
  }

  signin(ctx, done) {
    this.renderView(SigninView, done);
  }

  signout(ctx, done) {
    auth.signout();
    done();
  }
}
