import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllBlockChain {
  static GetAllBlockChainApi(body) {
    return http.get(
      httpUrl + "/api/v1/BlockChain/GetAllBlockChain?PageSize=" + http.pageSize
    );
  }
}
