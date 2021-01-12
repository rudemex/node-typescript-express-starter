import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import https from 'https';
import { toStringify } from './converters';
import signale from './signale';
import { HttpMethods } from './types';

const config = require('config');

const serverConfig = config['server'];

const headers = {
  'Content-Type': 'application/json',
  Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

const filterOptions = ({ ...rest }) => rest;

export const prepareResponse = async (
  method: Method,
  url: string,
  headers: any = {},
  params: any = {},
  data: any = {},
): Promise<AxiosPromise> => {
  const options = {
    url,
    method,
    headers,
    params,
    data,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
      requestCert: false,
    }),
  };

  if (Object.keys(headers).length) {
    options['headers'] = { ...headers };
  }

  if (Object.keys(params).length) {
    options['params'] = { ...params };
  }

  if (Object.keys(data).length) {
    options['data'] = { ...data };
  }

  signale.info(`REQUEST TO: ${encodeURI(url)}`);

  try {
    return await axios(options);
  } catch (error) {
    signale.error({
      prefix: '[prepareResponse] ERROR',
      message: toStringify(error),
    });
    throw error;
  }
};

const fetch = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  try {
    const instance = axios.create({ ...options });

    // INTERCEPTOR REQUEST
    instance.interceptors.request.use(
      (conf: AxiosRequestConfig) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.info({
            prefix: '[http-client][interceptor] REQUEST',
            message: toStringify(conf),
          });
        }
        return conf;
      },
      (error) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.error({
            prefix: '[http-client][interceptor] REQUEST',
            message: toStringify(error),
          });
        }
        return Promise.reject(error);
      },
    );

    // INTERCEPTOR RESPONSE
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.success('[http-client][interceptor] RESPONSE');
        }
        return response;
      },
      (error) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.error('[http-client][interceptor] RESPONSE');
        }
        return Promise.reject(error);
      },
    );

    signale.info(`REQUEST TO: ${encodeURI(url)}`);

    return await instance.request({
      url,
      data: options['data'],
      params: options['params'],
      method: options['method'],
      headers: options['headers'],
    });
  } catch (error) {
    signale.error({
      prefix: '[http-client] ERROR',
      message: toStringify(error),
    });
    throw error;
  }
};

const get = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return await fetch(url, {
    method: HttpMethods.GET,
    headers,
    ...filterOptions(options),
  });
};

const post = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return await fetch(url, {
    method: HttpMethods.POST,
    headers,
    ...filterOptions(options),
  });
};

const put = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return await fetch(url, {
    method: HttpMethods.PUT,
    headers,
    ...filterOptions(options),
  });
};

const del = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return await fetch(url, {
    method: HttpMethods.DELETE,
    headers,
    ...filterOptions(options),
  });
};

export default {
  prepareResponse,
  get,
  post,
  put,
  delete: del,
};
