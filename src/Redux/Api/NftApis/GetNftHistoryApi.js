import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftHistory {
  static GetNftHistoryApi(body) {
    return http.get(httpUrl + "/api/v1/Nft/GetNftHistory", body);
  }
}
