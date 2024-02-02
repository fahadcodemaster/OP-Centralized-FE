import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const AddNftRequest = createAction("AddNft_REQUEST");
export const AddNftSuccess = createAction("AddNft_SUCCESS");
export const AddNftFail = createAction("AddNft_FAIL");

const AddNftAction = (body) => (dispatch) => {
  // alert(body);
  dispatch(AddNftRequest());
  return new Promise((resolve) => {
    return Api.AddNft.AddNftApi(body)
      .then(({ data }) => {
        dispatch(AddNftSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(AddNftFail(error));
        resolve();
      });
  });
};
export default AddNftAction;
