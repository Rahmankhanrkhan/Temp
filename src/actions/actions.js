import { add_Data, delete_data } from "./types"


export const addData = (books) => {
  return {
    type: add_Data,
    payload: { books }
  }
}


export const deleteData = (id) => {
  return {
    type: delete_data,
    id
  }
}