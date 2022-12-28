import Book from "../models/book.js"
import Category from "../models/category.js"

const index = (req, res) => {
  const user = req.session.user
  const msg = req.session.msg || ""
  req.session.msg = ""
  res.render("dashboard/dashboard-index", { user: user, message: msg })
}

const userProfile = async (req, res) => {
  const user = req.session.user
  const msg = req.session.msg || ""
  req.session.msg = ""
  res.render('dashboard/user-profile', { user: user, message: msg })
}

const userBook = async (req, res) => {
  const user = req.session.user
  let msg = req.session.msg || ""
  req.session.msg = ""

  const book = await Book.findAll({
    where: {
      user_id: user.id
    },
    include: {
      model: Category,
      attributes: ['name']
    }
  })

  if (book.length < 1) msg = "Anda tidak memiliki buku"

  res.render("dashboard/user-book", { 
    books: book, 
    user: user,
    message: msg
  })
}

const showCreateBook = async (req, res) => {
  const categories = await Category.findAll({attributes: ["id","name"]})
  // res.send(categories)
  res.render('dashboard/createBook', {categories: categories})
}

const showAddBookFile = async (req, res) => {
  const book = await Book.findOne({
    attributes: ['id', 'title', 'published_year', 'user_id'],
    where: {id: req.params.id}
  })

  res.render('dashboard/add-book-file', {book: book})
}

export default { index, userProfile, userBook, showCreateBook, showAddBookFile }