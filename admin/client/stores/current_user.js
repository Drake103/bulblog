import alt from '../alt';
import { getValue } from 'libs/utils';
import currentUserActions from '../actions/current_user';

class CurrentUserStore {
  constructor() {
    this.bindActions(currentUserActions);
    this.user = null;
  }

  onSignin(user) {
    this.user = user;
  }

  onSignout() {
    this.user = null;
  }

  static get(keyPath) {
    let user = this.getState().user;

    if (!keyPath) {
      return user;
    } else {
      return getValue(keyPath, user);
    }
  }

  static authorized() {
    return !!this.get();
  }
}

export default alt.createStore(CurrentUserStore);
