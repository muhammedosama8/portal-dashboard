import BaseService from "./BaseService";
import http from "./HttpService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/vacations";

export default class VacationsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}