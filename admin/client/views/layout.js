import React from 'react';
import Component from '../base/component';
import Navbar from './components/navbar';
import PageHeader from './components/page_header';

export default class Layout extends Component {
  title() {
    return `${this.lang.brand.name} | ${this.lang.titles.welcome}`;
  }

  renderPartial() {

  }

  render() {
    return (
      <div id='wrapper'>
        <Navbar />
        <div id='page-wrapper'>
          {this.renderPartial()}
        </div>
      </div>);
  }
}
