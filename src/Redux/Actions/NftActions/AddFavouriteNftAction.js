import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const AddFavouriteNftRequest = createAction("AddFavouriteNft_REQUEST");
export const AddFavouriteNftSuccess = createAction("AddFavouriteNft_SUCCESS");
export const AddFavouriteNftFail = createAction("AddFavouriteNft_FAIL");

const AddFavouriteNftAction = (body) => (dispatch) => {
  // alert(body);
  dispatch(AddFavouriteNftRequest());
  return new Promise((resolve) => {
    return Api.AddFavouriteNft.AddFavouriteNftApi(body)
      .then(({ data }) => {
        dispatch(AddFavouriteNftSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(AddFavouriteNftFail(error));
        resolve();
      });
  });
};
export default AddFavouriteNftAction;
