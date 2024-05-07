import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/projects";

export default class ProjectsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
