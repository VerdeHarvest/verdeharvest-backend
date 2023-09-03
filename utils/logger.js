import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFilePath = path.join(__dirname, '../logs/app.log');
const errFilePath = path.join(__dirname, '../logs/errors.log');


const writeToActivityLog = (message) => {
  fs.appendFileSync(logFilePath, `${message}\n`);
};

const writeToErrorLog = (message) => {
  fs.appendFileSync(errFilePath, `${message}\n`);
};

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

const logger = {
  info: (message) => {
    log.info(`${message}`);
    writeToActivityLog(`[INFO] ${message}`);
  },
  error: (message) => {
    log.error(`[ERROR] ${message}`);
    writeToErrorLog(`[ERROR] ${message}`);
  },
};

export default logger;
