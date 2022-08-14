import * as actionCategories from "../actions/getCategoriesAction";
const initialstate = {
  categories: [],
  isLoading: true,
  hasErrors: false,
};

export default function getCategrieReducer(state = initialstate, action) {
  switch (action.type) {
    case actionCategories.GET_CATEGORIES:
      return { ...state, isLoading: true };
    case actionCategories.GET_CATEGORIES_SUCESS:
      return { categories: action.payload };
    case actionCategories.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        hasErrors: true,
        isLoading: false,
        categories: action.payload,
      };
    default:
      return state;
  }
}
