import page from 'page';
import currentUser from '../stores/current_user';


export default function auth (ctx, next) {
  if (!currentUser.authorized()) {
    return page.redirect('/signin');
  }

  next();
}
