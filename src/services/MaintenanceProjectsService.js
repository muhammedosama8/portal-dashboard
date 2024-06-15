import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/project/maintenanceProjects";

export default class MaintenanceProjectsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
