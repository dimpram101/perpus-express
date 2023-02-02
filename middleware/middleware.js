import Book from "../models/book.js"
import User from "../models/user.js"

const isLogged = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

const isUserBook = async (req, res, next) => {
  const { id } = req.session.user

  const book = await Book.findOne({
    attributes: ['id'],
    where: {
      id: req.params.id,
      user_id: id
    }
  })
  if (!book) {
    req.session.msg = "Anda tidak memiliki buku dengan id tersebut"
    res.redirect('/dashboard/user/book')
  } else {
    next()
  }
}

const isUserAuthor = async (req, res, next) => {
  // const { name } = req.session.user.role;
  // if (name !== 'Author') {
  //   req.session.msg = "Anda bukan author!";
  //   return res.redirect('/dashboard');
  // }
  const user = await User.findOne({
    attributes: ["role_id"],
    where: {
      id: req.session.user.id
    }
  })

  if (user.role_id !== 1) {
    req.session.msg = "Anda bukan author!";
    return res.redirect('/dashboard');
  }
  
  next();
}

const redirectAuthPage = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    next()
  }
}

export { isLogged, isUserAuthor, isUserBook, redirectAuthPage }