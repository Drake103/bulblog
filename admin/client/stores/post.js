import alt from '../alt';
import EntityStore from '../base/entity_store';
import { getValue } from '../../libs/utils';
import PostActions from '../actions/post';

class PostStore extends EntityStore {
  bindListeners () {
    this.bindListeners({
      handleUpdateEntities: PostActions.UPDATE_ENTITIES,
      handleFetchEntities: PostActions.FETCH_ENTITIES,
      handleEntitiesFailed: PostActions.ENTITIES_FAILED
    });
  }
}


export default alt.createStore(PostStore, 'PostStore');
