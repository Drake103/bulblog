import alt from '../alt';
import PostCollection from '../collections/post';

class PostActions {
  constructor() {
    this.generateActions('updateEntities', 'entitiesFailed');
  }

  fetchEntities() {
    this.dispatch();

    let posts = new PostCollection();
    posts.fetch()
      .done((entities) => {
        this.actions.updateEntities(entities);
      })
      .fail((errorMessage) => {
        this.actions.entitiesFailed(errorMessage);
      });
  }
}

export default alt.createActions(PostActions);
