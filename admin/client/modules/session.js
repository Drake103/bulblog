import Model from '../base/model';
import Backbone from 'backbone';
import vent from './vent';

class Session extends Model {
  defaults() {
    return {
      _id: 'static',
      timestamp: 0,
    };
  }

  initialize() {
    if (!process.browser) {
      return;
    }

    this.on('change', this.updated, this);
    this.fetch();
  }

  reset() {
    this.destroy();
    this.clear({ silent: true });
    this.set(this.defaults(), { silent: true });
    this.save();
  }

  updated() {
    this.set({ timestamp: Date.now() }, { silent: true });
    this.save();
  }
}

if (process.browser) {
  Session.prototype.localStorage = new Backbone.LocalStorage('walk:session');
}

export default new Session();
