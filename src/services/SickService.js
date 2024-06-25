import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/sickLeave";
const apiGetEndpoint = API_BASE_URL_ENV() + "/employee/accruedLeave";

export default class SickService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  // getList(params) {
  //   if(params){
  //     return http.get(apiGetEndpoint, {params});
  //   } else {
  //     return http.get(apiGetEndpoint);
  //   }
    
  // }
}