import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/project/serverMaintenance";

export default class ServerService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
