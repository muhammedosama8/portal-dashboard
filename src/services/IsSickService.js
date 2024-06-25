import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/isSick";

export default class IsSickService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

}