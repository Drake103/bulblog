import Model from '../base/model';


export default class UserModel extends Model {
  urlPath () {
    let urlPath = '/users';
    let username = this.username;

    if (username) urlPath += `/${username}`;

    return urlPath;
  }
}
