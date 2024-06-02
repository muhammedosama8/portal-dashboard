import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee";
const cancelResignation = API_BASE_URL_ENV() + "/employee/cancelResignation";
const resignation = API_BASE_URL_ENV() + "/employee/resignation";

export default class EmployeesService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  cancellationResignation(id) {
    return http.put(`${cancelResignation}/${id}`);
  }

  resignation(id, data) {
    return http.post(`${resignation}/${id}`, data);
  }
}
