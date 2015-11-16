export default function (req, res, next) {
  res.locals.lang = 'ru';
  req.lang = 'ru';
  next();
}
