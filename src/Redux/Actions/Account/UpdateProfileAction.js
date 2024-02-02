import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const UpdateProfileRequest = createAction("UpdateProfile_REQUEST");
export const UpdateProfileSuccess = createAction("UpdateProfile_SUCCESS");
export const UpdateProfileFail = createAction("UpdateProfile_FAIL");

const UpdateProfileAction = (body) => (dispatch) => {
  dispatch(UpdateProfileRequest());
  return new Promise((resolve, reject) => {
    return Api.UpdateProfile.UpdateProfileApi(body)
      .then(({ data }) => {
        dispatch(UpdateProfileSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(UpdateProfileFail(error));
        reject();
      });
  });
};

export default UpdateProfileAction;
