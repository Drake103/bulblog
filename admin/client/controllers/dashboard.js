import React from 'react';
import Controller from '../base/controller';
import DashboardView from '../views/dashboard';


export default class DashboardController extends Controller {
  index (ctx, done) {
    this.renderView(DashboardView, done);
  }
}
