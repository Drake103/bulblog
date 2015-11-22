import alt from '../alt';
import EntityStore from '../base/entity_store';
import PostActions from '../actions/post';

class PostStore extends EntityStore {
  _bindListeners() {
    this.bindListeners({
      handleUpdateEntities: PostActions.UPDATE_ENTITIES,
      handleFetchEntities: PostActions.FETCH_ENTITIES,
      handleEntitiesFailed: PostActions.ENTITIES_FAILED,
      handleUpdateState: PostActions.UPDATE_STATE,
    });
  }
}

export default alt.createStore(PostStore, 'PostStore');
