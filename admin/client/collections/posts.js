import Collection from '../base/collection';
import PostModel from '../models/post';


export default class PostsCollection extends Collection {
  urlPath () {
    return '/posts';
  }
}
