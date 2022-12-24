import Book from "../models/book.js";
import BookToCategory from "../models/book_to_category.js";

const getBook = async (req, res) => {
  const book = await Book.findAll()

  res.send(book)
}

const getBookByID = async (req, res) => {
  const book = await Book.findAll({
    where: {
      id: req.params.id
    }
  })

  res.send(book)
}

const showCreateBook = (req, res) => {
  res.render('createBook')
}

const createBook = async (req, res) => {
  const { title, published_year, categoryIDs} = req.body

  const newBook = await Book.create({
    title: title,
    published_year: published_year,
  });

  const bookCategory = await BookToCategory.create({
    bookId: newBook.id,
    categoryId: categoryIDs
  })
  
  res.send(newBook)
}

const deleteBook = (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id
    }
  }).then(res.send("berhasil menghapus buku"))
    .catch(err => res.send(err))
}

export { getBook, getBookByID, showCreateBook, createBook, deleteBook }