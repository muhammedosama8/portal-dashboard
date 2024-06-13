import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/project";

export default class ProjectsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  startDateProject(id,data) {
    return http.put(`${apiEndpoint}/startDateProject/${id}`, data);
  }
}
