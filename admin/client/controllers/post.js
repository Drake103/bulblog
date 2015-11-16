import Q from 'q';
import React from 'react';
import Controller from '../base/controller';
import PostListView from '../views/post/list';
import PostCardView from '../views/post/card';
import PostModel from '../models/post';
import PostsCollection from '../collections/posts';


export default class PostController extends Controller {
  list (ctx, done) {
    let posts = this.wrapModel(new PostsCollection());
    this.xhrs.posts = posts.fetch();

    let dfd = Q.all([this.xhrs.posts]);
    dfd.done(() => {
      this.setInitData({
        PostStore: {
          posts: posts.toJSON()
        }
      });

      this.renderView(PostListView, done);
    });
  }

  card (ctx, done) {
    let post = this.wrapModel(new PostModel());

    post._id = ctx.postId;
    this.xhrs.post = post.fetch();

    let dfd = Q.all([this.xhrs.post]);
    dfd.done(() => {
      this.setInitData({
        PostStore: {
          post: post.toJSON()
        }
      });

      this.renderView(PostCardView, done);
    });
  }
}
