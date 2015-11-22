import { getValue } from 'libs/utils';

export default class EntityStore {
  constructor() {
    this.results = [];
    this.page = 1;
    this.perPage = 20;
    this.loading = false;

    this.bindListeners();
  }

  bindListeners() {
    throw 'bindListeners is not overrided';
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

  handleUpdatePerPage(perPage) {
    this.perPage = perPage;
  }

  handleUpdatePage(page) {
    this.page = page;
  }
}
