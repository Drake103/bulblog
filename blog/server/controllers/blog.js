import Controller from '../base/controller';
import logger from '../libs/logger';
import PostModel from '../models/post';
import multiparty from 'multiparty';

export default class BlogController extends Controller {
  index (req, res, next) {
    PostModel.getLatest(0, 10, function(err, posts){
      res.render('blog/index',
        { posts : posts }
      );
    });
  }

  newPost(req, res, next){
    let post = {
      title: 'New post',
      content: 'Cool content'
    };

    res.render('blog/edit',
      { post : post }
    );
  }

  savePost(req, res, next){
    let form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      if(err){
        logger.error('cannot parse the form');
        res.redirect('/blog/new');
        return;
      }

      let post = {
        title: fields['title'],
        content: fields['content'],
        slug: fields['slug'],
      };

      PostModel.create(post, function (err, post) {
        if (err) {
          logger.error(`cannot save post ${err}`);
          res.redirect('/blog/new');
          return;
        }
        res.redirect('/');
      });
    });
  }

  router () {
    this.get('/', this.index);
    this.get('/blog/new', this.newPost);
    this.post('/blog/new', this.savePost);
  }
}
