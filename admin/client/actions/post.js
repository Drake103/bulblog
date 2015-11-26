import alt from '../alt';
import PostCollection from '../collections/post';

class PostActions {
  constructor() {
    this.generateActions('updateEntities', 'entitiesFailed', 'updatePage', 'updatePerPage', 'updateMaxPages', 'updateFilter');
  }

  fetchEntities(page, perPage, filter) {
    this.dispatch();

    let posts = new PostCollection();

    posts.page = +page;
    posts.perPage = +perPage;
    posts.filterModel = filter;

    this.actions.updateFilter(filter);

    posts.fetch()
      .done(() => {
        let entities = posts.toJSON();
        this.actions.updatePage(posts.page - 1);
        this.actions.updatePerPage(posts.perPage);
        this.actions.updateMaxPages(Math.ceil(posts.total / posts.perPage));
        this.actions.updateEntities(entities);
      })
      .fail((errorMessage) => {
        this.actions.entitiesFailed(errorMessage);
      });
  }
}

export default alt.createActions(PostActions);
