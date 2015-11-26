import alt from '../alt';
import EntityStore from '../base/entity_store';
import PostActions from '../actions/post';

class PostStore extends EntityStore {
  _bindListeners() {
    this.bindListeners({
      handleUpdateEntities: PostActions.UPDATE_ENTITIES,
      handleFetchEntities: PostActions.FETCH_ENTITIES,
      handleEntitiesFailed: PostActions.ENTITIES_FAILED,
      handleUpdatePage: PostActions.UPDATE_PAGE,
      handleUpdatePerPage: PostActions.UPDATE_PER_PAGE,
      handleUpdateMaxPages: PostActions.UPDATE_MAX_PAGES,
      handleUpdateFilter: PostActions.UPDATE_FILTER,
    });
  }
}

export default alt.createStore(PostStore, 'PostStore');
