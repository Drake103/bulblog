import PaginatedCollection from '../base/paginated_collection';
import PostModel from '../models/post';

export default class PostCollection extends PaginatedCollection {
  urlPath() {
    return '/posts';
  }
}
