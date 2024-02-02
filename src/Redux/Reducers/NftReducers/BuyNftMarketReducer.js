import { handleActions } from "redux-actions";

const initialState = {
  BuyNftMarketResponse: {},
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
const BuyNftMarket = handleActions(
  {
    BuyNftMarket_REQUEST: (state) => ({
      ...state,
      BuyNftMarketResponse: {
        ...state.defaultData,
      },
    }),
    BuyNftMarket_SUCCESS: (state, { payload }) => ({
      ...state,
      BuyNftMarketResponse: payload,
    }),
    BuyNftMarket_FAIL: (state, { payload }) => ({
      ...state,
      BuyNftMarketResponse: payload.data,
    }),
    BuyNftMarket_REQUEST_CLEAR: (state) => ({
      ...state,
      BuyNftMarketResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default BuyNftMarket;
