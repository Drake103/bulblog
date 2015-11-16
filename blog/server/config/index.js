import nconf from 'nconf';


nconf.argv().env();

nconf.file(__dirname + '/default.json');

export default nconf;
