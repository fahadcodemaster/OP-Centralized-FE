import { handleActions } from "redux-actions";

const initialState = {
  GetAllNftsByCollectionIdResponse: {},
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
const GetAllNftsByCollectionId = handleActions(
  {
    GetAllNftsByCollectionId_REQUEST: (state) => ({
      ...state,
      GetAllNftsByCollectionIdResponse: {
        ...state.defaultData,
      },
    }),
    GetAllNftsByCollectionId_SUCCESS: (state, { payload }) => ({
      ...state,
      GetAllNftsByCollectionIdResponse: payload,
    }),
    GetAllNftsByCollectionId_FAIL: (state, { payload }) => ({
      ...state,
      GetAllNftsByCollectionIdResponse: payload.data,
    }),
  },
  initialState
);

export default GetAllNftsByCollectionId;
