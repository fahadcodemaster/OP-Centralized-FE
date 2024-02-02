import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class ValidateSignature {
  static ValidateSignatureApi(body) {
    return http.post(httpUrl + "/api/v1/auth/validateSignature", body);
  }
}
