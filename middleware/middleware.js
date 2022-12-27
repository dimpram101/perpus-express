import Book from "../models/book.js"

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
    where: {
      id: req.params.id,
      user_id: id
    }
  })
  if (!book) {
    req.session.msg = "Anda tidak memiliki buku dengan id tersebut"
    res.redirect('/dashboard')
  } else {
    next()
  }
}

export { isLogged, isUserBook }