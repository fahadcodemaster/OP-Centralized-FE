import { handleActions } from "redux-actions";

const initialState = {
  GetNftMarketResponse: {},
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
const GetNftMarket = handleActions(
  {
    GetNftMarket_REQUEST: (state) => ({
      ...state,
      GetNftMarketResponse: {
        ...state.defaultData,
      },
    }),
    GetNftMarket_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftMarketResponse: payload,
    }),
    GetNftMarket_FAIL: (state, { payload }) => ({
      ...state,
      GetNftMarketResponse: payload.data,
    }),
    GetNftMarket_REQUEST_CLEAR: (state) => ({
      ...state,
      GetNftMarketResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetNftMarket;
