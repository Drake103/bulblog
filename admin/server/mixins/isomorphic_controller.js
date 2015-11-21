import _ from 'lodash';
import React from 'react';
import config from 'config';
import langs from 'config/langs';
import alt from '../../client/alt';
import Component from '../../client/base/component';

export default {
  setInitData(data) {
    data.CurrentUserStore = { user: this.req.user };
    alt.bootstrap(JSON.stringify(data));
  },

  wrapModel(model) {
    // Add token to  model, it's needed to send requests to API
    model.security = {
      token: _.result(this.req, 'user.token'),
    };

    return model;
  },

  renderView(ViewClass) {
    let { res, req } = this;

    // Hack to set language to render html
    Component.prototype.lang = langs[res.locals.lang];

    let View = React.createFactory(ViewClass);
    let html = React.renderToString(View());
    let title = ViewClass.prototype.title();

    // clear data for a next request
    Component.prototype.lang = null;

    res.render('layout', {
      title,
      html,
      env: res.locals.env,
      langs: _.pick(langs, [res.locals.lang]),
      config: config._client,
      stores: alt.flush(),
    });
  },
};
