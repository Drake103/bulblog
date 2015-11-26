import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import Griddle from 'griddle-react';
import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

export default class DataGrid extends Component {

  constructor() {
    super();

    _.bindAll(this, 'componentDidMount', 'componentWillUnmount',
      'getExternalData', 'setPage', 'onChange', 'setFilter', 'setPageSize');
  }

  initState() {
    return PostStore.getState();
  }

  //general lifecycle methods
  componentWillMount() {

  }

  componentDidMount() {
    PostStore.listen(this.onChange);
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
    let page = index;
    let perPage = this.state.perPage;
    let filter = this.state.filter;
    PostActions.fetchEntities(page, perPage, filter);
  }

  //this will handle how the data is sorted
  sortData(sort, sortAscending, data) {}

  //this changes whether data is sorted in ascending or descending order
  changeSort(sort, sortAscending) {}

  //this method handles the filtering of the data
  setFilter(filter) {
    let filterModel = { all: filter };
    let page = 1;
    let perPage = this.state.perPage;
    PostActions.fetchEntities(page, perPage, filterModel);
  }

  //this method handles determining the page size
  setPageSize(perPage) {
    let page = 1;
    let filter = this.state.filter;
    PostActions.fetchEntities(page, perPage, filter);
  }

  getExternalData(page) {
    var _this = this;
    page = page || 1;
    let perPage = this.state.perPage;
    let filter = this.state.filter;
    PostActions.fetchEntities(page, perPage, filter);
  }

  render() {
    return (
      <Griddle
        useExternal={true} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
        externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize}
        externalMaxPage={this.state.maxPages} externalCurrentPage={this.state.page}
        results={this.state.results} resultsPerPage={this.state.perPage}
        externalSortColumn={this.state.externalSortColumn} externalSortAscending={this.state.externalSortAscending}
        showFilter={true} showSettings={true}/>
    );
  }
};
