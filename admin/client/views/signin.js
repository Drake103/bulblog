import React from 'react';
import Form from '../base/form';
import PageHeader from './components/page_header';
import auth from '../modules/auth';

export default class Signin extends Form {
  title() {
    return `${this.lang.brand.name} | ${this.lang.titles.signin}`;
  }

  initState() {
    return { model: {} };
  }

  save(model) {
    let dfd = auth.signin(model);
    dfd.fail((xhr) => this.handleAPIError(xhr));
  }

  render() {
    return (<div className='l-layout p-signin'>
      <div className='l-content'>
        <PageHeader>{this.lang.titles.signin}</PageHeader>
        <div className='p-s-form card-panel'>
          <form onSubmit={this.handleSubmit}>
            <input valueLink={this.linkState('model.username')} type='text' placeholder={this.lang.fields.username} required />
            <input valueLink={this.linkState('model.password')} type='password' placeholder={this.lang.fields.password} required />
            <p className='l-text-center'>
              <button className='btn' type='submit'>{this.lang.captions.signin}</button>
            </p>
          </form>
        </div>
      </div>
    </div>);
  }
}
