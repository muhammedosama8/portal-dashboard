import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/indemnity";

export default class IndemnityService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
