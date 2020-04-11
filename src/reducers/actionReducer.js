import { add_Data, edit_Data, delete_data, } from "../actions/types";

export const actionReducer = (state = [], action) => {
  switch (action.type) {
    case add_Data:
      const { title, author, id } = action.payload.elements;
      console.log('ACTION REDUCER', id)
      return [...state, {
        title,
        author,
        id
      }];
    case edit_Data:
      console.log('action reducer', action)
      return state.map(data => data.id === action.payload.elements.id
        ? action.payload.elements : data
      )
    case delete_data:
      return state.filter(data => data.id !== action.payload.id)
    default:
      return state;
  }
}