import express from "express";
import userController from "../controllers/userController.js";
import bookController from "../controllers/bookController.js";
import fileController from "../controllers/fileController.js";
import dashboardController from "../controllers/dashboardController.js";
import authController from "../controllers/authController.js";

const route = express.Router();

const isLogged = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

route.get('/', (req, res) => {
  res.render('home/home-index')
})
route.get('/login', authController.index)
route.post('/login', authController.login)
route.get('/logout', authController.logout)

route.get('/dashboard', isLogged, dashboardController.index)
route.get('/dashboard/user', isLogged, userController.getUser)
route.post('/dashboard/user', isLogged, userController.createUser)
route.get('/dashboard/user/:id', isLogged, userController.getUserByID)
route.delete('/dashboard/user/:id', isLogged, userController.deleteUser)
route.put('/dashboard/user/:id', isLogged, userController.updateUser)
route.get('/dashboard/:id/book', isLogged, bookController.getBook)
route.get('/dashboard/book/create', isLogged, bookController.showCreateBook)
route.post('/dashboard/book/create', isLogged, bookController.createBook)
route.get('/dashboard/book/:id', isLogged, bookController.getBookByID)
route.delete('/dashboard/book/:id', isLogged, bookController.deleteBook)
route.get('/dashboard/book/:id/file', isLogged, fileController.index)
route.post('/dashboard/book/:id/file', isLogged, fileController.upload.array('files') ,fileController.insertFile)



export default route