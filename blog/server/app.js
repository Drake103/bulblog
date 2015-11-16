import config from './config';
import domain from 'domain';
import express from 'express';
import logger from './libs/logger';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import middlewares from './middlewares';
import controllers from './controllers';
import apiControllers from './api_controllers';
import mongoose from 'mongoose';

class Server {
  constructor () {
    this.app = express();

    this.app.set('views', __dirname + '/../views');
    this.app.set('view engine', 'jade');
  }

  preRouteMiddleware () {
    this.app.use((req, res, next) => {
      var _domain = domain.create();
      _domain.add(req);
      _domain.add(res);
      _domain.run(next);
      _domain.on('error', next);
    });

    this.app.use(morgan(config.get('debug') ? 'dev' : 'combined', { "stream": logger.stream }));

    this.app.use(middlewares.stylus);

    this.app.use(express.static(__dirname + '/../public'));

    // Set language.
    this.app.use(middlewares.lang);
  }

  postRouteMiddleware () {
    if (config.get('debug')) {
      this.app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
      }));
    } else {
      this.app.use((err, req, res, next) => {
        logger.error(err.stack || err);
        middlewares.serverError(res);
      });
    }

    this.app.use((req, res, next) => middlewares.notFound(res));
  }

  initControllers () {
    for (let Controller of controllers) {
      new Controller().use(this.app);
    }

    for (let ApiController of apiControllers) {
      new ApiController().use(this.app);
    }
  }

  database (callback) {
    mongoose.connect(config.get('mongoose:uri'));

    mongoose.connection.on('error', (error) => {
      logger.error(`mongodb operation failed: ${error}`);
    });

    mongoose.connection.once('open', () => {
      logger.info(`mongodb was connected`);
      callback();
    });
  }

  run () {
    this.preRouteMiddleware();
    this.initControllers();
    this.postRouteMiddleware();

    this.app.set('port', config.get('server:port'));

    let host = config.get('server:ip');
    let port = config.get('server:port');

    this.database(() => {
      this.app.listen(port, host, () => {
        logger.info(`server running on ${host}:${port}`);
      });
    });
  }
}

new Server().run();
