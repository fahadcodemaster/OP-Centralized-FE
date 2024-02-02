import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftCollectionByIdWithOutAccountRequest = createAction(
  "GetNftCollectionByIdWithOutAccount_REQUEST"
);
export const GetNftCollectionByIdWithOutAccountSuccess = createAction(
  "GetNftCollectionByIdWithOutAccount_SUCCESS"
);
export const GetNftCollectionByIdWithOutAccountFail = createAction(
  "GetNftCollectionByIdWithOutAccount_FAIL"
);

const GetNftCollectionByIdWithOutAccountAction = (body) => (dispatch) => {
  dispatch(GetNftCollectionByIdWithOutAccountRequest());
  return new Promise((resolve, reject) => {
    return Api.GetNftCollectionByIdWithOutAccount.GetNftCollectionByIdWithOutAccountApi(
      body
    )
      .then(({ data }) => {
        dispatch(GetNftCollectionByIdWithOutAccountSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftCollectionByIdWithOutAccountFail(error));
        reject(error);
      });
  });
};
export default GetNftCollectionByIdWithOutAccountAction;
