import { getValue } from 'libs/utils';

export default class EntityStore {
  constructor() {
    this.results = [];
    this.page = 0;
    this.perPage = 10;
    this.maxPages = 0;
    this.loading = false;
    this.filter = {};

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

  handleUpdatePage(page) {
    this.page = page;
  }

  handleUpdatePerPage(perPage) {
    this.perPage = perPage;
  }

  handleUpdateMaxPages(maxPages) {
    this.maxPages = maxPages;
  }

  handleUpdateFilter(filter) {
    this.filter = filter;
  }
}
