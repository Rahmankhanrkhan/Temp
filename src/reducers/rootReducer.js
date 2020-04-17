import { combineReducers } from "redux";
import { actionReducer } from './actionReducer'
import { wordReducer } from "./wordReducer";

export const rootReducer = combineReducers({
  data: actionReducer,
  word: wordReducer
})