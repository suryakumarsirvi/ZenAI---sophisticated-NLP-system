import pino from 'pino';
import { CONFIG } from './env.config.js';

const transport =
  CONFIG.NODE_ENV !== 'production'
    ? pino.transport({
        target: 'pino-pretty'
      })
    : pino.transport({
        target: 'pino/file',
        options: {
          destination: './logs/App.log'
        }
      });

const logger = pino({}, transport);

export default logger;