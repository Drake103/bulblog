import error from './error';


export default function (res) {
  error(res, 'not_found', 404);
}
