import alt from '../alt';
import PostCollection from '../collections/post';

class PostActions {
  constructor() {
    this.generateActions('updateEntities', 'entitiesFailed', 'updatePerPage', 'updatePage');
  }

  fetchEntities(page, perPage) {
    this.dispatch();

    let posts = new PostCollection();
    posts.fetch({ data: { page, perPage } })
      .done((entities) => {
        this.actions.updateEntities(entities);
        this.actions.updatePerPage(posts.perPage);
        this.actions.updatePage(posts.page);
      })
      .fail((errorMessage) => {
        this.actions.entitiesFailed(errorMessage);
      });
  }
}

export default alt.createActions(PostActions);
