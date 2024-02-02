import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetMyAllCollectionsRequest = createAction(
  "GetMyAllCollections_REQUEST"
);
export const GetMyAllCollectionsSuccess = createAction(
  "GetMyAllCollections_SUCCESS"
);
export const GetMyAllCollectionsFail = createAction("GetMyAllCollections_FAIL");

const GetMyAllCollectionsAction = (body) => (dispatch) => {
  dispatch(GetMyAllCollectionsRequest());
  return new Promise((resolve, reject) => {
    return Api.GetMyAllCollections.GetMyAllCollectionsApi(body)
      .then(({ data }) => {
        dispatch(GetMyAllCollectionsSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetMyAllCollectionsFail(error));
        reject();
      });
  });
};
export default GetMyAllCollectionsAction;
