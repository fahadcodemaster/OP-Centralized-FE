import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllNftsByCollectionId {
  static GetAllNftsByCollectionIdApi(body) {
    return http.get(
      httpUrl +
        "/api/v1/Nft/GetAllNftsByCollectionId?CollectionId=" +
        body +
        "&PageSize=" +
        http.pageSize
    );
  }
}
