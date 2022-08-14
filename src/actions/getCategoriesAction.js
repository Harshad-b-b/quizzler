import axios from "axios";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORIES_SUCESS = "GET_CATEGORIES_SUCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategorieSucess = (categories) => ({
  type: GET_CATEGORIES_SUCESS,
  payload: categories,
});

export const getCategorieFailure = (msg) => ({
  type: GET_CATEGORIES_FAILURE,
  payload: msg,
});

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(getCategories());

    axios
      .get("https://opentdb.com/api_category.php")
      .then((resp) => {
        dispatch(getCategorieSucess(resp.data.trivia_categories));
      })
      .catch((error) => {
        dispatch(getCategorieFailure(error));
      });
  };
};
