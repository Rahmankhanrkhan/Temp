import { add_Data, edit_Data, delete_data } from "./types"


export const addData = (elements) => {
  console.log('ACTIONS', elements)
  return {
    type: add_Data,
    payload: { elements }
  }
}

export const editData = (elements) => {
  console.log('Edit action', elements)
  return {
    type: edit_Data,
    payload: {
      elements
    }
  }
}

export const deleteData = (id) => {
  return {
    type: delete_data,
    payload: { id }
  }
}