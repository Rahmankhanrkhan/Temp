import { add_Data, edit_Data  } from "./types"

// import { add_Data } from './types'

export const addData = (title, author) => {
  console.log('ACTIONS', title)
  return {
    type: add_Data,
    payload :{title,
    author}
  }
}

export const editData = (title, author, id) => {
  console.log('Edit action', title, author,id)
  return {
    type: edit_Data,
    payload:{title,
    author,
    id}
  }
}