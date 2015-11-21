import ru from './ru';

class Langs {
  constructor() {
    this.errorMessage = this.errorMessage.bind(this);
  }

  errorMessage(lang, code) {
    return this[lang].errors[code] || code;
  }
}

Langs.prototype.ru = ru;

export default new Langs();
