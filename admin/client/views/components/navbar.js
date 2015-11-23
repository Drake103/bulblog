import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import currentUser from '../../stores/current_user';
import auth from '../../modules/auth';

export default class Navbar extends Component {

  getLinks() {
    return [
      { href: './', text: this.lang.links.dashboard },
      { href: './posts', text: this.lang.links.posts },
    ];
  }

  render() {
    let links = _.map(this.getLinks(), l => <NavbarLink key={l.href} href={l.href}>{l.text}</NavbarLink>);

    return (
      <div id='sidebar-wrapper'>
          <ul className='sidebar-nav'>
              <li className='sidebar-brand'>
                  <a href='#'>
                      Start Bootstrap
                  </a>
              </li>
              {links}
          </ul>
      </div>
    );
  }
}

class NavbarLink extends Component {
  render() {
    return <li><a href={this.props.href}>{this.props.children}</a></li>;
  }
}
