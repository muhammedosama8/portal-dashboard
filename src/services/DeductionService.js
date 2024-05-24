import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/deduction";

export default class DeductionService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}