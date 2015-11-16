import vent from './vent';
import $ from 'jquery';


class WindowEvents {
  constructor () {
    this.$doc = $(document);
    this.$win = $(window);

    this.$doc.on('click', this.handleClick);
  }

  handleClick (event) {
    vent.trigger('document:click', event);
  }
}

export default new WindowEvents();
