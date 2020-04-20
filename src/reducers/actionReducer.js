import { add_Data, edit_Data, delete_data, } from "../actions/types";

export const actionReducer = (state = [], action) => {
  switch (action.type) {
    case add_Data:
      const { books } = action.payload
      console.log('books in reducer:::', books)

      const details = []
      for (let key in books) {
        const title = books[key].title
        const author = books[key].author
        const id = books[key].id
        const url = books[key].url
        const userId = books[key].userId

        details.push({
          title,
          author,
          id,
          url,
          userId
        })
      }
      console.log('DETAILS FROM RED :', details)
      return {
        ...state,
        books: details
      }

    // case delete_data:
    //   const { id } = action;
    //   console.log("REDUCER ID :", id);
    //   console.log('FILTER :', state.books.filter(book => book.id !== id))
    //   return { books: state.books.filter(book => book.id !== id) } 
    default:
      return state;
  }
}