import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftCollectionByIdRequest = createAction(
  "GetNftCollectionById_REQUEST"
);
export const GetNftCollectionByIdSuccess = createAction(
  "GetNftCollectionById_SUCCESS"
);
export const GetNftCollectionByIdFail = createAction(
  "GetNftCollectionById_FAIL"
);

const GetNftCollectionByIdAction = (body) => (dispatch) => {
  dispatch(GetNftCollectionByIdRequest());
  return new Promise((resolve, reject) => {
    return Api.GetNftCollectionById.GetNftCollectionByIdApi(body)
      .then(({ data }) => {
        dispatch(GetNftCollectionByIdSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftCollectionByIdFail(error));
        reject(error);
      });
  });
};
export default GetNftCollectionByIdAction;
