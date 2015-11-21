import React from 'react';
import Layout from '../layout';
import PageHeader from '../components/page_header';
import PostStore from '../../stores/post';
import PostActions from '../../actions/post';
import Component from '../../base/component';
import _ from 'lodash';

export default class PostList extends Layout {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.posts}`;
  }

  renderPartial () {
    return (<PostDataGrid />);
  }
}

class PostDataGrid extends Component {
  initState () {
    return PostStore.getState();
  }

  componentDidMount () {
    PostStore.listen(this.onChange);

    PostActions.fetchEntities();
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    let posts = this.state.results;
    console.log(this.state);
    let postRows = _.map(posts, p => <PostRow key={p._id} post={p} />);

    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Content</th>
        </tr>
        {postRows}
      </table>
    )
  }
}

class PostRow {
  render () {
    let post = this.props.post;

    return (
      <tr>
        <td>{post.title}</td>
        <td>{post.content}</td>
      </tr>
    );
  }
}
