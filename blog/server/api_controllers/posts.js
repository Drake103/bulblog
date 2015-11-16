import jwt from 'jsonwebtoken';
import config from '../config';
import ModelController from '../base/model_controller';
import PostModel from '../models/post';


export default class PostsController extends ModelController {
  constructor () {
    super();
    this.urlPrefix = '/posts';
    this.Model = PostModel;
    this.actions = ['create', 'get', 'list'];
    this.listFields = ['title', 'content', 'tags', 'slug', 'created_at', 'modified_at', '__v'];

    this.create.type = 'post';

    this.get.url = '/:slug';
    //this.get.auth = true;

    //this.list.auth = true;
  }

  get (req, res, next) {
    var slug = req.params.slug;

    this.Model.findOne({ slug }).lean().exec((err, post) => {
      if (err) {
        return next(err);
      }

      if (!post) {
        return this.notFound(res);
      }

      return res.json(post);
    });
  }
}
