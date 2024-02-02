import { handleActions } from "redux-actions";

const initialState = {
  GetMyAllNftsResponse: {},
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
const GetMyAllNfts = handleActions(
  {
    GetMyAllNfts_REQUEST: (state) => ({
      ...state,
      GetMyAllNftsResponse: {
        ...state.defaultData,
      },
    }),
    GetMyAllNfts_SUCCESS: (state, { payload }) => ({
      ...state,
      GetMyAllNftsResponse: payload,
    }),
    GetMyAllNfts_FAIL: (state, { payload }) => ({
      ...state,
      GetMyAllNftsResponse: payload.data,
    }),
    GetMyAllNfts_REQUEST_CLEAR: (state) => ({
      ...state,
      GetMyAllNftsResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetMyAllNfts;
