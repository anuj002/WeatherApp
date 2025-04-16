import * as Utility from '../util/Utility';
import * as APIConstant from './ApiConstants';
import axios from 'axios';
let FETCH_TIMEOUT = 60000;

export async function apiRequest(
  method,
  url,
  header,
  params,
  callback,
  callbackFailure
) {
  Utility.getNetInfo().then(async isConnected => {
    if (!isConnected) {
      Utility.showNoInternetDialog();
      callbackFailure && callbackFailure();
      return;
    }
    let body;
    let queryParams;
    let query = '';
    var headers = {
      // 'x-client-id': APIConstant.X_CLIENT_ID,
      // 'x-client-secret': APIConstant.X_CLIENT_SECRET,
      // 'device-type': Platform.OS == 'ios' ? 'ios' : 'android',
      // 'device-Id': DeviceInfo.getUniqueId(),
      // 'device-brand': DeviceInfo.getBrand(),
      // 'device-build': DeviceInfo.getBuildNumber(),
      // 'device-version': DeviceInfo.getSystemVersion(),
      // 'app-version': DeviceInfo.getVersion(),
      // 'apiv': APIConstant.API_VERSION,
    };

   
    if (header && typeof header !== 'boolean') {
      headers = { ...headers, ...header };
    }

    if (method === 'POST') {
      body = paramsToBody(params);
    } else if (method === 'GET') {
      queryParams = params;
      // query = paramsToUrlQueryParams(params);
    } else if (method === 'PUT' || method === 'DELETE') {
      body = params;
    } else if (method === 'JSON_POST') {
      body = params;
      method = 'POST';
    }
    console.log('url : ', url + query);
    console.log('method : ', method);
    console.log('BODY : ', body);
    console.log('headers : ', JSON.stringify(headers));
    
    axios({
      method: method,
      url: url,
      data: body,
      timeout: FETCH_TIMEOUT,
      params: queryParams,
      headers: headers,
    })
      .then(function (response) {
        let resJson;
        // console.log('responseData==>', response?.data)
        if (response?.data?.cod === 200) {
          try {
            resJson = response;
          } catch (e) {
            resJson = '';
            callbackFailure && callbackFailure();
          }
        } else {
          resJson = response;
          callbackFailure && callbackFailure();
        }
        return resJson;
      })
      .then(responseJson => {
        if (!responseJson) {
          return;
        }
        // console.log('responseJsonData==>', responseJson?.data)
        if (responseJson?.data?.cod === 200 && callback) {
          // Success
          callback(responseJson?.data);
          return;
          } else if ((responseJson?.data?.cod == 400 || responseJson?.data?.cod == 401 || responseJson?.data?.cod == 404 || responseJson?.data?.cod === 422) && callbackFailure) {
            // 401 -> Auth Failed // 404 -> error // 422 -> Validation Failure
            callbackFailure(responseJson?.data);
            return;
        } else {
          callbackFailure(responseJson?.data);
          return;
        }
      })
      .catch(error => {
        if (callbackFailure) {
          if (error && error?.response) {
            callbackFailure(error?.response?.data);
            console.log(error?.response?.data?.message)
          } else {
            callbackFailure(error);
            console.log(error)
          }
        }
      });
  }).catch(error => {
    console.log('InternateError===>', error);
  });
}

function paramsToBody(params) {
  if (!params || params.length < 1) {
    console.warn('response : empty params');
    return null;
  }

  const body = new FormData();
  for (let k in params) {
    body.append(k, params[k]);
  }
  return body;
}

function paramsToUrlQueryParams(params) {
  const esc = encodeURIComponent;
  let query = '';
  if (params) {
    query = '?';
    query += Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }
  return query;
}


// method, url, header, params, callback, callbackFailure

/**
 *
 * @param city
 * @param callbackSuccess
 * @param callbackFailure
 */

export async function fetchWeatherByCity(city, callbackSuccess, callbackFailure) {
    let params = {
        q: city,
        units: "metric",
        appid: APIConstant.WEATHER_API_KEY
    };
    let header = {};
  
    apiRequest(
    'JSON_POST', // 'GET'
    APIConstant.WEATHER_BASE_URL,
    header,
    params,
    callbackSuccess,
    callbackFailure
  );
}
