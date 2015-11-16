import _ from 'lodash';
import env from '../../libs/env';
import langs from '../../config/langs';
import {format} from '../../libs/utils';


export default function (error) {
  if (!process.browser) {
    throw new Error('Can\' call error module on server side');
  }

  if (_.isString(error)) {
    return langs[env.get('lang')].errors[error];
  }

  let messages = [];

  for (let key in error) {
    let message = _.capitalize(format(langs[env.get('lang')].errors[error[key]], key));
    messages.push(message);
  }

  return messages.join('\n');
}
