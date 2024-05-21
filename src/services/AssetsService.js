import BaseService from "./BaseService";
import http from "./HttpService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/asset";
const apiUnsignedAssetsEndpoint = API_BASE_URL_ENV() + "/asset/unsignedAssets";

export default class AssetsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  getUnsignedAssetsList() {
    return http.get(apiUnsignedAssetsEndpoint);
  }
}