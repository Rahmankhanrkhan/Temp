import fireaBaseConfig from "../config/fireBaseConfig"

export const add_Data = 'add_Data'
export const edit_Data = 'edit_Data'
export const delete_data ='delete_data'

export const bookDb = fireaBaseConfig.child('books')
export const userUploadsDb = fireaBaseConfig.child('UserUploads')