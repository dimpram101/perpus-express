import express from "express";
import { getUser, getUserByID, createUser, deleteUser, updateUser } from "../controllers/userController.js"
import { getBook, getBookByID, showCreateBook, createBook, deleteBook } from "../controllers/bookController.js";

const route = express.Router();

route.get('/user', getUser)
route.get('/user/:id', getUserByID)
route.post('/user', createUser)
route.delete('/user/:id', deleteUser)
route.put('/user/:id', updateUser)

route.get('/book', getBook)
route.get('/book/create', showCreateBook)
route.post('/book/create', createBook)

route.get('/book/:id', getBookByID)
route.delete('/book/:id', deleteBook)

export default route