import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetAllNftsByCollectionIdRequest = createAction(
  "GetAllNftsByCollectionId_REQUEST"
);
export const GetAllNftsByCollectionIdSuccess = createAction(
  "GetAllNftsByCollectionId_SUCCESS"
);
export const GetAllNftsByCollectionIdFail = createAction(
  "GetAllNftsByCollectionId_FAIL"
);

const GetAllNftsByCollectionIdAction = (body) => (dispatch) => {
  dispatch(GetAllNftsByCollectionIdRequest());
  return new Promise((resolve, reject) => {
    return Api.GetAllNftsByCollectionId.GetAllNftsByCollectionIdApi(body)
      .then(({ data }) => {
        dispatch(GetAllNftsByCollectionIdSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetAllNftsByCollectionIdFail(error));
        reject(error);
      });
  });
};
export default GetAllNftsByCollectionIdAction;
