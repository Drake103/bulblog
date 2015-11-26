import React from 'react';
import Layout from './layout';
import PageHeader from './components/page_header';

export default class Dashboard extends Layout {
  title() {
    return `${this.lang.brand.name} | ${this.lang.titles.welcome}`;
  }

  renderPartial() {
    return (
      <div>
        <PageHeader>{this.lang.titles.welcome}</PageHeader>
      </div>);
  }
}
