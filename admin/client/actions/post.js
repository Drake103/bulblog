import alt from '../alt';
import PostCollection from '../collections/post';

class PostActions {
  constructor() {
    this.generateActions('updateEntities', 'entitiesFailed', 'updateState');
  }

  fetchEntities(page, perPage) {
    this.dispatch();

    let posts = new PostCollection();
    posts.page = page;
    posts.perPage = perPage;
    posts.fetch()
      .done((entities) => {
        this.actions.updateEntities(entities);
        let state = {
          page: posts.page,
          perPage: posts.perPage,
          maxPages: Math.ceil(posts.total / posts.perPage),
        };
        this.actions.updateState(state);
      })
      .fail((errorMessage) => {
        this.actions.entitiesFailed(errorMessage);
      });
  }
}

export default alt.createActions(PostActions);
