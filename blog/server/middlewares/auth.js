import error from './error';


export default function (req, res, next) {
  if (!req.authorized) {
    return error(res, 'auth_required', 401);
  }

  next();
}
