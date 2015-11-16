import alt from '../alt';
import { getValue } from '../../libs/utils';

class PostStore {
  constructor () {
    this.posts = [];
  }
}


export default alt.createStore(PostStore);
