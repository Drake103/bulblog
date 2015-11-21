import Collection from '../base/collection';
import PostModel from '../models/post';


export default class PostCollection extends Collection {
  urlPath () {
    return '/posts';
  }
}
