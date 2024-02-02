import { handleActions } from "redux-actions";

const initialState = {
  SellNftMarketResponse: {},
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
const SellNftMarket = handleActions(
  {
    SellNftMarket_REQUEST: (state) => ({
      ...state,
      SellNftMarketResponse: {
        ...state.defaultData,
      },
    }),
    SellNftMarket_SUCCESS: (state, { payload }) => ({
      ...state,
      SellNftMarketResponse: payload,
    }),
    SellNftMarket_FAIL: (state, { payload }) => ({
      ...state,
      SellNftMarketResponse: payload.data,
    }),
    SellNftMarket_REQUEST_CLEAR: (state) => ({
      ...state,
      SellNftMarketResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default SellNftMarket;
