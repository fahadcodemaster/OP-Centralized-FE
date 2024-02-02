import { handleActions } from "redux-actions";

const initialState = {
  GetAllBlockChainResponse: {},
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
const GetAllBlockChain = handleActions(
  {
    GetAllBlockChain_REQUEST: (state) => ({
      ...state,
      GetAllBlockChainResponse: {
        ...state.defaultData,
      },
    }),
    GetAllBlockChain_SUCCESS: (state, { payload }) => ({
      ...state,
      GetAllBlockChainResponse: payload,
    }),
    GetAllBlockChain_FAIL: (state, { payload }) => ({
      ...state,
      GetAllBlockChainResponse: payload.data,
    }),
    GetAllBlockChain_REQUEST_CLEAR: (state) => ({
      ...state,
      GetAllBlockChainResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetAllBlockChain;
