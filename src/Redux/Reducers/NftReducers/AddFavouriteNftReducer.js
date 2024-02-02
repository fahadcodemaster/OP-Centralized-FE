import { handleActions } from "redux-actions";

const initialState = {
  AddFavouriteNftResponse: {},
};

const defaultData = {
  data: {
    token: null,
    userInfo: {},
  },
  error: null,
  isSuccess: true,
  message: "",
};
const AddFavouriteNft = handleActions(
  {
    AddFavouriteNft_REQUEST: (state) => ({
      ...state,
      AddFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
    AddFavouriteNft_SUCCESS: (state, { payload }) => ({
      ...state,
      AddFavouriteNftResponse: payload,
    }),
    AddFavouriteNft_FAIL: (state, { payload }) => ({
      ...state,
      AddFavouriteNftResponse: payload.data,
    }),
    AddFavouriteNft_REQUEST_CLEAR: (state) => ({
      ...state,
      AddFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default AddFavouriteNft;
