import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftCollectionCategoriesRequest = createAction(
  "GetNftCollectionCategories_REQUEST"
);
export const GetNftCollectionCategoriesSuccess = createAction(
  "GetNftCollectionCategories_SUCCESS"
);
export const GetNftCollectionCategoriesFail = createAction(
  "GetNftCollectionCategories_FAIL"
);

const GetNftCollectionCategoriesAction = (body) => (dispatch) => {
  dispatch(GetNftCollectionCategoriesRequest());
  return new Promise((resolve, reject) => {
    return Api.GetNftCollectionCategories.GetNftCollectionCategoriesApi(body)
      .then(({ data }) => {
        dispatch(GetNftCollectionCategoriesSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftCollectionCategoriesFail(error));
        reject(error);
      });
  });
};
export default GetNftCollectionCategoriesAction;
