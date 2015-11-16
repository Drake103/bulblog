import alt from '../alt';


class CurrentUserActions {
  constructor () {
    this.generateActions('signin', 'signout');
  }
}

export default alt.createActions(CurrentUserActions);
