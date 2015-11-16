import React from 'react';
import Layout from '../layout';
import PageHeader from '../components/page_header';
import postStore from '../../stores/post';
import Component from '../../base/component';
import _ from 'lodash';

export default class PostList extends Layout {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.posts}`;
  }

  initState () {
    return postStore.getState();
  }

  renderPartial () {
    let { posts } = this.state;
    let postRows = _.map(posts, p => <PostRow key={p._id} post={p} />);

    return (
      <div>
        <PageHeader>{this.lang.titles.posts}</PageHeader>
        <ul>
          {postRows}
        </ul>
      </div>);
  }
}

class PostRow extends Component {
  render () {
    return (
      <li>{this.props.post.title}</li>
    );
  }
}
