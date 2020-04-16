import { add_Data, edit_Data, delete_data } from "./types"


export const addData = (books) => {
  //console.log('ACTIONS', books)
  return {
    type: add_Data,
    payload: { books }
  }
}

export const editData = (elements) => {
 // console.log('Edit action', elements)
  return {
    type: edit_Data,
    payload: {
      elements
    }
  }
}

export const deleteData = (id) => {
  //console.log('ACTION DELETE', id)
  return {
    type: delete_data,
    id
  }
}