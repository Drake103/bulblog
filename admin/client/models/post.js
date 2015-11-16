import Model from '../base/model';


export default class PostModel extends Model {
  urlPath () {
    let urlPath = '/posts';
    let postId = this._id;

    if (postId) urlPath += `/${postId}`;

    return urlPath;
  }
}
