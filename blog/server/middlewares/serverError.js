import error from './error';


export default function (res) {
  error(res, 'unexpected_error', 500);
}
