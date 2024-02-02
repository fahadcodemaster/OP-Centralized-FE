import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftCollectionCategories {
  static GetNftCollectionCategoriesApi(body) {
    return http.get(
      httpUrl +
        "/api/v1/Nft/GetNftCollectionCategories?PageSize=" +
        http.pageSize
    );
  }
}
