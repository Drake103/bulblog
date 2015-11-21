import React from 'react';
import Layout from '../layout';
import PageHeader from '../components/page_header';
import postStore from '../../stores/post';

export default class PostCard extends Layout {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.welcome}`;
  }

  initState () {
    return postStore.getState();
  }

  renderPartial () {
    let { post } = this.state;

    return (
      <div>
        <PageHeader>{post.title}</PageHeader>
        <div>{post.content}</div>
      </div>);
  }
}
