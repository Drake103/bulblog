import _ from 'lodash';
import $ from 'jquery';
import config from '../../config';
import Model from '../base/model';
import vent from './vent';
import currentUserActions from '../actions/current_user';


export default {
  setTokenHeaders (user) {
    let headers = { 'X-Access-Token': _.result(user, 'token.value') };
    $.ajaxSetup({ headers });
  },

  unsetTokenHeaders () {
    let headers = { 'X-Access-Token': '' };
    $.ajaxSetup({ headers });
  },

  signin (data) {
    let user = null;

    let dfd = $.ajax({
      data,
      url: `${config.api_root}/auth`,
      type: 'post',
    })
    .then((_user) => {
      user = _user;

      return $.ajax({
        url: '/auth/login',
        type: 'post',
        data: user,
      });
    });

    dfd.done(() => {
      this.setTokenHeaders(user);
      currentUserActions.signin(user);
      vent.trigger('user:signin');
    });

    return dfd;
  },

  signout () {
    let dfd = $.ajax('/auth/logout');

    dfd.done(() => {
      this.unsetTokenHeaders();
      currentUserActions.signout();
      vent.trigger('user:signout');
    });

    return dfd;
  },
};
