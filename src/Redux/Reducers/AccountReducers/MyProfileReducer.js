import { handleActions } from "redux-actions";

const initialState = {
  MyProfileResponse: {},
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
const MyProfile = handleActions(
  {
    MyProfile_REQUEST: (state) => ({
      ...state,
      MyProfileResponse: {
        ...state.defaultData,
      },
    }),
    MyProfile_SUCCESS: (state, { payload }) => ({
      ...state,
      MyProfileResponse: payload,
    }),
    MyProfile_FAIL: (state, { payload }) => ({
      ...state,
      MyProfileResponse: payload.data,
    }),
    MyProfile_REQUEST_CLEAR: (state) => ({
      ...state,
      MyProfileResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default MyProfile;
