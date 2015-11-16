import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import langs from '../../config/langs';
import env from '../../libs/env';


export default class Component extends React.Component {
  constructor (props) {
    super();
    this.refreshState = this.refreshState.bind(this);
    this.state = this.initState(props);
  }

  refreshState () {
    this.setState(this.initState());
  }

  initState () {
    return {};
  }

  trigger (eventName, ...args) {
    eventName = `on${_.capitalize(eventName)}`;
    if (this.props[eventName]) this.props[eventName](...args);
  }
}

if (process.browser) Component.prototype.lang = langs[env.get('lang')];
Component.prototype.cx = classnames;
