import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import Griddle from 'griddle-react';

export default class DataGrid extends Component {

  initState() {
    return {};
  }

  //general lifecycle methods
  componentWillMount () {
    
  }

  componentDidMount () {

  }

  //what page is currently viewed
  setPage (index) {
    //This should interact with the data source to get the page at the given index
    index = index > this.state.maxPages ? this.state.maxPages : index < 1 ? 1 : index + 1;
    this.getExternalData(index);
  }

  //this will handle how the data is sorted
  sortData (sort, sortAscending, data) {}

  //this changes whether data is sorted in ascending or descending order
  changeSort (sort, sortAscending) {}

  //this method handles the filtering of the data
  setFilter (filter) {}

  //this method handles determining the page size
  setPageSize (size) {

  }

  getExternalData (page) {
    let that = this;
    page = page || 1;

    LocationActions.fetch();
  }

  render () {
    return(
      <Griddle useExternal={true} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
        externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize}
        externalMaxPage={this.state.maxPages} externalCurrentPage={this.state.currentPage}
        results={this.state.results} resultsPerPage={this.state.resultsPerPage}
        externalSortColumn={this.state.externalSortColumn} externalSortAscending={this.state.externalSortAscending}
        showFilter={true} showSettings={true}/>
    );
  }
};
