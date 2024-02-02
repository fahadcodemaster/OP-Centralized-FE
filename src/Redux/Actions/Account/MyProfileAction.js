import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const MyProfileRequest = createAction("MyProfile_REQUEST");
export const MyProfileSuccess = createAction("MyProfile_SUCCESS");
export const MyProfileFail = createAction("MyProfile_FAIL");

const MyProfileAction = () => (dispatch) => {
  dispatch(MyProfileRequest());
  return new Promise((resolve, reject) => {
    return Api.MyProfile.MyProfileApi()
      .then(({ data }) => {
        dispatch(MyProfileSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(MyProfileFail(error));
        reject(error);
      });
  });
};

export default MyProfileAction;
