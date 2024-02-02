import { handleActions } from "redux-actions";

const initialState = {
  GetNftCollectionByIdResponse: {},
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
const GetNftCollectionById = handleActions(
  {
    GetNftCollectionById_REQUEST: (state) => ({
      ...state,
      GetNftCollectionByIdResponse: {
        ...state.defaultData,
      },
    }),
    GetNftCollectionById_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftCollectionByIdResponse: payload,
    }),
    GetNftCollectionById_FAIL: (state, { payload }) => ({
      ...state,
      GetNftCollectionByIdResponse: payload.data,
    }),
  },
  initialState
);

export default GetNftCollectionById;
