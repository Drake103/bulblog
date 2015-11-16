import alt from './alt';
import currentUser from './stores/current_user';
import auth from './modules/auth';


alt.bootstrap(JSON.stringify(window.app.stores));
if (currentUser.authorized()) auth.setTokenHeaders(currentUser.get());
