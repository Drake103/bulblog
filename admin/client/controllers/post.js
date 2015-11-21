import Q from 'q';
import React from 'react';
import Controller from '../base/controller';
import PostListView from '../views/post/list';
import PostCardView from '../views/post/card';
import PostModel from '../models/post';
import PostCollection from '../collections/post';

export default class PostController extends Controller {
  list(ctx, done) {
    let posts = this.wrapModel(new PostCollection());
    this.xhrs.posts = posts.fetch();

    let dfd = Q.all([this.xhrs.posts]);
    dfd.done(() => {
      this.setInitData({
        PostStore: {
          results: posts.toJSON(),
        },
      });

      this.renderView(PostListView, done);
    });
  }

  card(ctx, done) {
    let post = this.wrapModel(new PostModel());
    post.slug = ctx.params.slug;
    this.xhrs.post = post.fetch();

    let dfd = Q.all([this.xhrs.post]);
    dfd.done(() => {
      this.setInitData({
        PostStore: {
          post: post.toJSON(),
        },
      });

      this.renderView(PostCardView, done);
    });
  }
}
