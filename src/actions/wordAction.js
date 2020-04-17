import { image_url } from "./types"

export const imageUrl = (url) => {
  console.log('action url',url)
  //console.log('ACTIONS', books)
  return {
    type: image_url,
    payload: { url }
  }
}