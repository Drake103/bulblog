import config from 'config';
import domain from 'domain';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'libs/logger';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import middlewares from './middlewares';
import controllers from './controllers';
import Router from './router';

class Server {
  constructor() {
    this.app = express();
    this.app.set('views', __dirname + '/../views');
    this.app.set('view engine', 'jade');
    this.router = new Router();
  }

  generateEnv(req, res, next) {
    res.locals.env = {};
    res.locals.env.lang = req.lang;

    next();
  }

  preRouteMiddleware() {
    this.app.use((req, res, next) => {
      let _domain = domain.create();
      _domain.add(req);
      _domain.add(res);
      _domain.run(next);
      _domain.on('error', next);
    });

    this.app.use(session({
      secret: config.session.secret,
      cookie: { maxAge: config.session.maxAge },
      resave: false,
      saveUninitialized: false,
    }));
    let isDebug = config.debug;
    this.app.use(morgan(isDebug ? 'dev' : 'combined', { stream: logger.stream }));

    // Set publis assets.
    this.app.use(express.static('public'));

    // Set language.
    this.app.use(middlewares.lang);

    // Parse application/json.
    this.app.use(bodyParser.json({ limit: 1024 * 1024 }));

    // Get Access token from API.
    this.app.use(middlewares.accessToken);

    // Create environment
    this.app.use(this.generateEnv);
  }

  initControllers() {
    for (let Controller of controllers) {
      new Controller().use(this.app);
    }
  }

  postRouteMiddleware() {
    if (config.debug) {
      this.app.use(errorhandler({
        dumpExceptions: true,
        showStack: true,
      }));
    } else {
      this.app.use((err, req, res, next) => {
        logger.log('error', err.stack || err);
        middlewares.serverError(res);
      });
    }

    this.app.use((req, res, next) => middlewares.notFound(res));
  }

  run() {
    this.preRouteMiddleware();
    this.router.run(this.app);
    this.initControllers();
    this.postRouteMiddleware();

    this.app.set('port', config.server.port);

    this.app.listen(config.server.port, config.server.ip, () => {
      logger.log('info', `server running on ${config.server.ip}:${config.server.port}`);
    });
  }
}

new Server().run();
