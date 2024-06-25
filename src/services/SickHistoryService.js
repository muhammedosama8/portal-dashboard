import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/employee/historyVacation";

export default class SickHistoryService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

}