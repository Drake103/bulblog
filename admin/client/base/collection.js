import _ from 'lodash';
import $ from 'jquery';
import { Collection } from 'backbone';
import config from 'config';
import urlQuery from 'libs/url_query';

export default class BaseCollection extends Collection {
  url() {
    let params = {};
    let url = `${this.apiRoot}${_.result(this, 'urlPath')}`;

    if (this.order) {
      params.order = this.order;
    }

    if (this.filterModel) {
      params.filter = this.filterModel;
    }

    return urlQuery(url, params);
  }

  parse(resp) {
    this.total = resp.total;
    this.page = resp.page;
    this.perPage = resp.per_page;

    return resp.collection;
  }

  fetchCount() {
    let dfd = this.$(`${this.url()}/count`);
    dfd.done((resp) => {
      this.count = resp.count;
    });

    return dfd;
  }
}

BaseCollection.prototype.$ = $.ajax;
BaseCollection.prototype.apiRoot = config.api_root || config._client.api_root;
BaseCollection.prototype.idAttribute = '_id';
