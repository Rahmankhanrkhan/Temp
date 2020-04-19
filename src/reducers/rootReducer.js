import { combineReducers } from "redux";
import { actionReducer } from './actionReducer'

export const rootReducer = combineReducers({
  data: actionReducer
})