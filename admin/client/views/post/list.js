import React from 'react';
import Layout from '../layout';
import PageHeader from '../components/page_header';
import PostStore from '../../stores/post';
import PostActions from '../../actions/post';
import Component from '../../base/component';
import _ from 'lodash';

export default class PostList extends Layout {
  title() {
    return `${this.lang.brand.name} | ${this.lang.titles.posts}`;
  }

  renderPartial() {
    return (<PostDataGrid />);
  }
}

class PostDataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = PostStore.getState();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log('postDataGrid is mounted');
    PostStore.listen(this.onChange);
    PostActions.fetchEntities();
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let posts = this.state.results;
    let postRows = _.map(posts, p => <PostRow key={p._id} post={p} />);

    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Content</th>
        </tr>
        {postRows}
      </table>
    );
  }
}

class PostRow {
  render() {
    let post = this.props.post;

    return (
      <tr>
        <td>{post.title}</td>
        <td>{post.content}</td>
      </tr>
    );
  }
}
