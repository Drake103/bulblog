import page from 'page';
import currentUser from '../stores/current_user';

export default function notAuth(ctx, next) {
  next();
}
