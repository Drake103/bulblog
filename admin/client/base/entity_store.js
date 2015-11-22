import { getValue } from 'libs/utils';

export default class EntityStore {
  constructor() {
    this.results = [];
    this.page = 1;
    this.perPage = 20;
    this.maxPages = 100;
    this.loading = false;

    this._bindListeners();
  }

  _bindListeners() {
    throw '_bindListeners is not overrided';
  }

  handleUpdateEntities(results) {
    this.results = results;
    this.errorMessage = null;
  }

  handleFetchEntities() {
    this.results = [];
  }

  handleEntitiesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateState(state) {
    let {page, perPage, maxPages} = state;
    if (page) {
      this.page = page;
    }

    if (perPage) {
      this.perPage = perPage;
    }

    if (maxPages) {
      this.maxPages = maxPages;
    }
  }
}
