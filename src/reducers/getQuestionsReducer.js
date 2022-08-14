import * as questions from "../actions/getQuestions";
const initialstate = {
  question: [],
  isLoading: true,
  hasErrors: false,
};

export default function getQuestionsReducer(state = initialstate, action) {
  switch (action.type) {
    case questions.GET_QUESTIONS:
      return { ...state, isLoading: true };
    case questions.GET_QUESTIONS_SUCESS:
      return { question: action.payload, isLoading: false };
    case questions.GET_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasErrors: true,
        question: action.payload,
      };
    default:
      return state;
  }
}
