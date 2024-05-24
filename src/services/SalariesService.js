import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/salary";

export default class SalariesService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}