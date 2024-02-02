import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetMyNftByIdRequest = createAction("GetMyNftById_REQUEST");
export const GetMyNftByIdSuccess = createAction("GetMyNftById_SUCCESS");
export const GetMyNftByIdFail = createAction("GetMyNftById_FAIL");

const GetMyNftByIdAction = (body) => (dispatch) => {
  dispatch(GetMyNftByIdRequest());
  return new Promise((resolve, reject) => {
    return Api.GetMyNftById.GetMyNftByIdApi(body)
      .then(({ data }) => {
        dispatch(GetMyNftByIdSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetMyNftByIdFail(error));
        reject(error);
      });
  });
};
export default GetMyNftByIdAction;
