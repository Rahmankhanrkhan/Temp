import { image_url } from "../actions/types"

export const wordReducer = (state = '', action) => {
  switch (action.type) {
    case image_url:
      const { url } = action.payload
      console.log('reducer URL',url)
      return { ...state, url }
    default:
      return state
  }
};
