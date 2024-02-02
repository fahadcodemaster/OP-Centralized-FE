import { handleActions } from "redux-actions";

const initialState = {
  GetProfileResponse: {},
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
const GetProfile = handleActions(
  {
    GetProfile_REQUEST: (state) => ({
      ...state,
      GetProfileResponse: {
        ...state.defaultData,
      },
    }),
    GetProfile_SUCCESS: (state, { payload }) => ({
      ...state,
      GetProfileResponse: payload,
    }),
    GetProfile_FAIL: (state, { payload }) => ({
      ...state,
      GetProfileResponse: payload.data,
    }),
    GetProfile_REQUEST_CLEAR: (state) => ({
      ...state,
      GetProfileResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetProfile;
