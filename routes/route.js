import express from "express";
import userController from "../controllers/userController.js";
import bookController from "../controllers/bookController.js";
import fileController from "../controllers/fileController.js";
import dashboardController from "../controllers/dashboardController.js";
import authController from "../controllers/authController.js";
import { isLogged, isUserBook } from "../middleware/middleware.js";

const route = express.Router();

route.get('/', (req, res) => {
  let user = req.session.user
  res.render('home/home-index', {user: user})
})

route.get('/login', authController.index)
route.post('/login', authController.login)
route.get('/logout', authController.logout)
route.post('/register', authController.register)

route.get('/dashboard', isLogged, dashboardController.index)
route.get('/dashboard/user', isLogged, dashboardController.userProfile)
route.post('/dashboard/user', isLogged, userController.createUser)
route.put('/dashboard/user', isLogged, userController.updateUser)

route.get('/dashboard/user/book', isLogged, dashboardController.userBook)
route.get('/dashboard/user/book/create', isLogged, dashboardController.showCreateBook)
route.post('/dashboard/user/book/create', isLogged, bookController.createBook)
route.get('/dashboard/user/book/:id', [isLogged, isUserBook], bookController.getBookByID)
route.delete('/dashboard/user/book/:id', [isLogged, isUserBook], bookController.deleteBook)

route.get('/files', fileController.getFiles)

route.get('/dashboard/user/book/:id/file', isLogged, dashboardController.showAddBookFile)
route.post('/dashboard/user/book/:id/file', [isLogged, fileController.upload.array('files')] ,fileController.insertFile)

export default route