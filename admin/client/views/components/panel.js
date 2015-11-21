import React from 'react';
import Component from '../../base/component';

class Panel extends Component {
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
            <i className='fa fa-clock-o fa-fw'></i> {this.props.title}
        </div>
        <div className='panel-body'>
            {this.props.children}
        </div>
      </div>);
  }
}
