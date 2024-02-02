import { handleActions } from "redux-actions";

const initialState = {
  AuthConnectResponse: {},
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
const AuthConnect = handleActions(
  {
    AuthConnect_REQUEST: (state) => ({
      ...state,
      AuthConnectResponse: {
        ...state.defaultData,
      },
    }),
    AuthConnect_SUCCESS: (state, { payload }) => ({
      ...state,
      AuthConnectResponse: payload,
    }),
    AuthConnect_FAIL: (state, { payload }) => ({
      ...state,
      AuthConnectResponse: payload.data,
    }),
    AuthConnect_REQUEST_CLEAR: (state) => ({
      ...state,
      AuthConnectResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default AuthConnect;
