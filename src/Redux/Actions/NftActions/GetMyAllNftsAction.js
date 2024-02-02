import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetMyAllNftsRequest = createAction("GetMyAllNfts_REQUEST");
export const GetMyAllNftsSuccess = createAction("GetMyAllNfts_SUCCESS");
export const GetMyAllNftsFail = createAction("GetMyAllNfts_FAIL");

const GetMyAllNftsAction = (body) => (dispatch) => {
  dispatch(GetMyAllNftsRequest());
  return new Promise((resolve) => {
    return Api.GetMyAllNfts.GetMyAllNftsApi(body)
      .then(({ data }) => {
        dispatch(GetMyAllNftsSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetMyAllNftsFail(error));
        resolve();
      });
  });
};
export default GetMyAllNftsAction;
