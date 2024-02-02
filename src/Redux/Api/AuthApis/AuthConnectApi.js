import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class AuthConnect {
  static AuthConnectApi(body) {
    return http.post(httpUrl + "/api/v1/auth/connect", body);
  }
}
