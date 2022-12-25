import express from "express";
import userController from "../controllers/userController.js";
import bookController from "../controllers/bookController.js";
import fileController from "../controllers/fileController.js";

const route = express.Router();

route.get('/user', userController.getUser)
route.post('/user', userController.createUser)
route.get('/user/:id', userController.getUserByID)
route.delete('/user/:id', userController.deleteUser)
route.put('/user/:id', userController.updateUser)

route.get('/book', bookController.getBook)
route.get('/book/create', bookController.showCreateBook)
route.post('/book/create', bookController.createBook)
route.get('/book/:id', bookController.getBookByID)
route.delete('/book/:id', bookController.deleteBook)
route.get('/book/:id/file', fileController.index)
route.post('/book/:id/file', fileController.upload.array('files') ,fileController.insertFile)



export default route