import { Signale } from 'signale-logger';

/*
 * Signale Types:
 * error, fatal, fav, info, star, success, wait, warn, complete, pending, note, start, pause, debug, await, watch, log
 *
 * Used Type:
 * success, error, info, note
 * */

const options: any = {
  types: {
    santa: {
      badge: '🎅',
      color: 'red',
      label: 'santa',
      logLevel: 'info',
    },
    success: {
      badge: '✔',
      color: 'green',
      label: 'success',
      logLevel: 'debug',
    },
    error: {
      badge: '✖',
      color: 'red',
      label: 'error',
      logLevel: 'error',
    },
    info: {
      badge: 'ℹ',
      color: 'blue',
      label: 'info',
      logLevel: 'debug',
    },
    note: {
      badge: '●',
      color: 'blue',
      label: 'note',
      logLevel: 'debug',
    },
  },
};

const signale = new Signale(options);

export default signale;
