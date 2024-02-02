import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetProfileRequest = createAction("GetProfile_REQUEST");
export const GetProfileSuccess = createAction("GetProfile_SUCCESS");
export const GetProfileFail = createAction("GetProfile_FAIL");

const GetProfileAction = (body) => (dispatch) => {
  dispatch(GetProfileRequest());
  return new Promise((resolve) => {
    return Api.GetProfile.GetProfileApi(body)
      .then(({ data }) => {
        dispatch(GetProfileSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetProfileFail(error));
        resolve();
      });
  });
};

export default GetProfileAction;
