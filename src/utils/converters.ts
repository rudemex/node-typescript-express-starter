const config = require('config');
import moment from 'moment-timezone';

const serverConfig = config['server'];

// Format date
export const formatDate = (
  date: string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  timeZone: string = `${serverConfig['tz']}`,
): string => moment(date).tz(timeZone).format(format);

// Format date UTC 2013-11-18T11:55Z
export const formatDateUTC = (
  date: string,
  format: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  timeZone: string = `${serverConfig['tz']}`,
): string => moment(date).tz(timeZone).format(format);

// Format timestamp(unix) to date
export const formatTimestampToDate = (
  date: number,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  timeZone: string = `${serverConfig['tz']}`,
): string => moment.unix(date).tz(timeZone).format(format);

// Format date to timestamp(unix)
export const formatDateToTimestamp = (
  date: string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  timeZone: string = `${serverConfig['tz']}`,
): any => moment(date, format).tz(timeZone).unix();

export const toStringify = (data: any, replace: any = null, space: number = 2): string => {
  return JSON.stringify(data, replace, space);
};
