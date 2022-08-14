import * as redirectAction from "../actions/redirectAction";
const initialState = false;
export default function redirectReducer(state = initialState, action) {
  switch (action.type) {
    case redirectAction.IS_TRUE:
      console.log(state);
      return true;
    case redirectAction.IS_FALSE:
      return false;
    default:
      return state;
  }
}
