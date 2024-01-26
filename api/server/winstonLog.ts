import { createLogger, transports, format } from 'winston';

const appLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'appLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const configLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'configLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const errorHandlerLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'errorHandlerLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const serverLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'serverLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const currencyLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'currencyLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const conversionsLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'conversionsLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

export {
  appLogger,
  configLogger,
  errorHandlerLogger,
  serverLogger,
  currencyLogger,
  conversionsLogger,
};
