import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftMarket {
  static GetNftMarketApi() {
    return http.get(
      httpUrl + "/api/v1/Nft/GetNftMarket?PageSize=" + http.pageSize
    );
  }
}
