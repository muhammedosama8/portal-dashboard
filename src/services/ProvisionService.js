import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/provision";

export default class ProvisionService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
