import stylus from 'stylus';
import nib from 'nib';


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

export default stylus.middleware(
  { src: __dirname + '/../public', compile: compile  }
);
