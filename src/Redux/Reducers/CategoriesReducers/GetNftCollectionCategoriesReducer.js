import { handleActions } from "redux-actions";

const initialState = {
  GetNftCollectionCategoriesResponse: {},
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
const GetNftCollectionCategories = handleActions(
  {
    GetNftCollectionCategories_REQUEST: (state) => ({
      ...state,
      GetNftCollectionCategoriesResponse: {
        ...state.defaultData,
      },
    }),
    GetNftCollectionCategories_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftCollectionCategoriesResponse: payload,
    }),
    GetNftCollectionCategories_FAIL: (state, { payload }) => ({
      ...state,
      GetNftCollectionCategoriesResponse: payload.data,
    }),
    GetNftCollectionCategories_REQUEST_CLEAR: (state) => ({
      ...state,
      GetNftCollectionCategoriesResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetNftCollectionCategories;
