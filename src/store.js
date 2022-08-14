import getCategrieReducer from "./reducers/getCategorieReducer";
import getQuestionsReducer from "./reducers/getQuestionsReducer";
import redirectReducer from "./reducers/redirectReducer";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const reducers = combineReducers({
  questions: getQuestionsReducer,
  categories: getCategrieReducer,
  redirect: redirectReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
