import Model from '../base/model';

export default class PostModel extends Model {
  urlPath() {
    let urlPath = '/posts';
    let slug = this.slug;

    if (slug) urlPath += `/${slug}`;

    return urlPath;
  }
}
