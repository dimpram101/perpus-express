import Book from "../models/book.js";
import BookToCategory from "../models/book_to_category.js";
import Category from "../models/category.js";
import File from "../models/file.js";
import User from "../models/user.js";

const getBook = async (req, res) => {
  // const userId = req.session.
  const { id } = req.session.user
  console.log(id)
  const book = await Book.findAll({
    where: {
      user_id: id
    },
    include: {
      attributes: ['name'],
      model: Category
    }
  })
  res.send(book)
}

const getBookByID = async (req, res) => {
  const book = await Book.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      attributes: ["name"]
    }, {
      model: Category,
      attributes: ["name"]
    }, {
      model: File,
      attributes: ["id", "path"]
    }]
  })

  res.send(book)
}

const showCreateBook = async (req, res) => {
  const categories = await Category.findAll({attributes: ["id","name"]})
  // res.send(categories)
  res.render('createBook', {categories: categories})
}

const createBook = async (req, res) => {
  const { title, published_year, categoryIDs } = req.body
  const cateId = categoryIDs[0].split(",").map(id => parseInt(id))

  const newBook = await Book.create({
    title: title,
    published_year: published_year,
  });

  cateId.forEach(async id => {
    await BookToCategory.create({
      bookId: newBook.id,
      categoryId: id
    })
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


export default { getBook, getBookByID, showCreateBook, createBook, deleteBook }