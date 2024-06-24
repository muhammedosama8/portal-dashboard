import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/project/projectPayment";
const apiProjectPaymentDetailsEndpoint = API_BASE_URL_ENV() + "/project/projectPaymentDetails";

export default class ProjectsPaymentService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  getProjectPayment(id) {
    return http.get(`${apiProjectPaymentDetailsEndpoint}/${id}`);
  }
  create(id, data) {
    return http.post(`${apiEndpoint}/${id}`, data);
  }
}
