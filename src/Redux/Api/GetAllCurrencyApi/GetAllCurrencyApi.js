import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllCurrency {
  static GetAllCurrencyApi(body) {
    return http.get(
      httpUrl + "/api/v1/BlockChain/GetAllCurrency?PageSize=" + http.pageSize
    );
  }
}
