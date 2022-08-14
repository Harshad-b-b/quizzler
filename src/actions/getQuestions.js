import axios from "axios";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const GET_QUESTIONS_SUCESS = "GET_QUESTIONS_SUCESS";
export const GET_QUESTIONS_FAILURE = "GET_QUESTIONS_FAILURE";

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});
export const getQuestionsSucess = (questions) => ({
  type: GET_QUESTIONS_SUCESS,
  payload: questions,
});
export const getQuestionsFailure = (msg) => ({
  type: GET_QUESTIONS_FAILURE,
  payload: msg,
});

export const fetchQuestions = (userValues) => {
  return (dispatch) => {
    dispatch(getQuestions);
    axios
      .get(
        ` https://opentdb.com/api.php?amount=${userValues.amount}&category=${userValues.category}&difficulty=${userValues.difficulty}`
      )
      .then((resp) => {
        dispatch(getQuestionsSucess(resp.data));
        console.log(resp.data);
      })
      .catch((error) => {
        dispatch(getQuestionsFailure(error));
      });
  };
};
//
//
