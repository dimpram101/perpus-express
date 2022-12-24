import Book from "../models/book.js";
import BookToCategory from "../models/book_to_category.js";
import Category from "../models/category.js";
import User from "../models/user.js";

const getBook = async (req, res) => {
  const book = await Book.findAll({
    include: [{
      attributes: ['name', 'email'],
      model: User
    }, {
      attributes: ['name'],
      model: Category
    }]
  })
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

const showCreateBook = async (req, res) => {
  const categories = await Category.findAll({attributes: ["name"]})
  // res.send(categories)
  res.render('createBook', {categories: categories})
}

const createBook = async (req, res) => {
  const { title, published_year, categoryIDs} = req.body
  const cateId = categoryIDs[0].split(",").map(id => parseInt(id))

  // return res.json({
  //   title: title,
  //   published_year: published_year,
  //   categoryIDs: categoryIDs,
  //   categoryIDsInt: cateId
  // })
  const newBook = await Book.create({
    title: title,
    published_year: published_year,
  });

  cateId.forEach(id => {
    BookToCategory.create({
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

export { getBook, getBookByID, showCreateBook, createBook, deleteBook }