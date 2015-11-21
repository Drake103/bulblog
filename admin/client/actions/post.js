import alt from '../alt';
import PostCollection from '../collections/post';
import EntityActions from '../base/entity_actions';


class PostActions extends EntityActions {
  constructor () {
    super();

    this.Collection = PostCollection;
  }
}

export default alt.createActions(PostActions);
