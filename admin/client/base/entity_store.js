import { getValue } from '../../libs/utils';

export default class EntityStore {
  constructor () {
    this.results = [];
    this.currentPage = 0;
    this.maxPages = 0;
    this.resultsPerPage = 0;
    this.loading = false;

    this.bindListeners();
  }

  bindListeners () {
    throw 'bindListeners is not overrided';
  }

  handleUpdateEntities (results) {
    this.results = results;
    this.errorMessage = null;
  }

  handleFetchEntities () {
    this.results = [];
  }

  handleEntitiesFailed (errorMessage){
    this.errorMessage = errorMessage;
  }
}
