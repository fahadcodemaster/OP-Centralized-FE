import { handleActions } from "redux-actions";

const initialState = {
  GetFavouriteNftResponse: {},
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
const GetFavouriteNft = handleActions(
  {
    GetFavouriteNft_REQUEST: (state) => ({
      ...state,
      GetFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
    GetFavouriteNft_SUCCESS: (state, { payload }) => ({
      ...state,
      GetFavouriteNftResponse: payload,
    }),
    GetFavouriteNft_FAIL: (state, { payload }) => ({
      ...state,
      GetFavouriteNftResponse: payload.data,
    }),
    GetFavouriteNft_REQUEST_CLEAR: (state) => ({
      ...state,
      GetFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetFavouriteNft;
