import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import currentUser from '../../stores/current_user';
import auth from '../../modules/auth';


export default class Navbar extends Component {

  getLinks () {
    return [
      { href: './', text: this.lang.links.dashboard },
      { href: './posts', text: this.lang.links.posts }
    ];
  }

  render () {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
        <NavbarHeader />
        <TopbarMenu />
        <Sidebar links={ this.getLinks() } />
      </nav>);
  }
}

class NavbarHeader extends Component {
  render() {
    return (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="/">Bulblog admin</a>
      </div>);
  }
}

class NavbarMenu extends Component {
  render () {
    let links = _.map(this.props.links, l => <Link href={l.href}>{l.text}</Link>);

    return <ul className='m-n-menu collection'>{links}</ul>
  }
}

class Link extends Component {
  render () {
    return <li><a className='collection-item' href={this.props.href}>{this.props.children}</a></li>
  }
}

class Sidebar extends Component {
  render () {
    return (
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <SidebarMenu links={this.props.links} />
        </div>
      </div>);
  }
}

class SidebarMenu extends Component {
  render () {
    let links = _.map(this.props.links, l => <SidebarLink key={l.href} href={l.href}><i className="fa fa-dashboard fa-fw"></i>{l.text}</SidebarLink>);

    return <ul className="nav metismenu" id="side-menu">{links}</ul>;
  }
}

class SidebarLink extends Component {
  render () {
    return <li><a href={this.props.href}>{this.props.children}</a></li>;
  }
}

class TopbarMenu extends Component {
  render() {
    return (
      <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="fa fa-user fa-fw"></i>  <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                  <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                  </li>
                  <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                  </li>
                  <li className="divider"></li>
                  <li><a href="/signout"><i className="fa fa-sign-out fa-fw"></i> Sign out</a>
                  </li>
              </ul>
          </li>
      </ul>);
  }
}
