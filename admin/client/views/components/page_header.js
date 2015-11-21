import React from 'react';
import Component from '../../base/component';

export default class PageHeader extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
            <h1 className='page-header'>{this.props.children}</h1>
        </div>
      </div>);
  }
}
