import React from 'react';
import Form from '../base/form';
import Navbar from './components/navbar';
import PageHeader from './components/page_header';
import UserModel from '../models/user';
import auth from '../modules/auth';


export default class Signup extends Form {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.signup}`;
  }

  initState () {
    return { model: {} };
  }

  save (model) {
    if (model.confirm_password !== model.password) {
      return this.showError('invalid_confirm_password');
    }

    let newUser = new UserModel(model);
    let dfd = newUser.save().then(() => {
      return auth.signin(newUser.toJSON());
    });

    dfd.fail((xhr) => this.handleAPIError(xhr));
  }

  render () {
    return (<div className='l-layout p-signup'>
      <div className='l-content'>
        <PageHeader>{this.lang.titles.signup}</PageHeader>
        <div className='p-s-form card-panel'>
          <form onSubmit={this.handleSubmit}>
            <input valueLink={this.linkState('model.username')} type='text' placeholder={this.lang.fields.username} required />
            <input valueLink={this.linkState('model.full_name')} type='text' placeholder={this.lang.fields.full_name} required/>
            <input valueLink={this.linkState('model.email')} type='text' placeholder={this.lang.fields.email} required />
            <input valueLink={this.linkState('model.password')} type='password' placeholder={this.lang.fields.password} required />
            <input valueLink={this.linkState('model.confirm_password')} type='password' placeholder={this.lang.fields.confirm_password} required />
            <p className='l-text-center'>
              <button type='submit' className='btn'>{this.lang.captions.signup}</button>
            </p>
          </form>
        </div>
      </div>
    </div>);
  }
}
