import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import Griddle from 'griddle-react';
import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

export default class DataGrid extends Component {

  constructor() {
    super();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getExternalData = this.getExternalData.bind(this);
  }

  initState() {
    return PostStore.getState();
  }

  //general lifecycle methods
  componentWillMount() {

  }

  componentDidMount() {
    PostStore.listen(this.onChange);
    PostActions.fetchEntities();
  }

  componentWillUnmount() {
    PostStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  setPage(index) {
    //This should interact with the data source to get the page at the given index
    index = index > this.state.maxPages ? this.state.maxPages : index < 1 ? 1 : index + 1;
    this.getExternalData(index);
  }

  //this will handle how the data is sorted
  sortData(sort, sortAscending, data) {}

  //this changes whether data is sorted in ascending or descending order
  changeSort(sort, sortAscending) {}

  //this method handles the filtering of the data
  setFilter(filter) {}

  //this method handles determining the page size
  setPageSize(perPage) {
    PostActions.updatePerPage(perPage);
  }

  getExternalData(page) {
    let perPage = this.state.perPage;
    PostActions.fetchEntities(page, perPage);
  }

  render() {
    return (
      <Griddle useExternal={true} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
        externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize}
        externalMaxPage={this.state.maxPages} externalCurrentPage={this.state.page}
        results={this.state.results} resultsPerPage={this.state.perPage}
        externalSortColumn={this.state.externalSortColumn} externalSortAscending={this.state.externalSortAscending}
        showFilter={true} showSettings={true}/>
    );
  }
};
