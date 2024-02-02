import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetUserAccount {
  static GetUserAccount(params) {
    return http.get(httpUrl + "/api/v1/Account/GetUserAccount", params);
  }
}
