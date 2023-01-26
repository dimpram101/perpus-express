import db from "../config/database.js";
import Book from "../models/book.js";
import BookToCategory from "../models/book_to_category.js";
import Category from "../models/category.js";
import File from "../models/file.js";
import User from "../models/user.js";
import { Op, QueryTypes } from "sequelize";

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

const getAllBook = async (req, res) => {
  // const userId = req.session.
  let query = req.query.title || "";

  if (query) {
    const book = await Book.findAll({
      where: {
        title: {
          [Op.like] : `%${query}%`
        }
      },
      include: {
        model: Category,
        attributes: ['name']
      }
    })
    res.send(book);
  } else {
    const book = await Book.findAll({
      include: {
        model: Category,
        attributes: ['name']
      }
    })
    res.send(book);
  }

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

const createBook = async (req, res) => {
  const { title, published_year, categoryIDs } = req.body
  const { id } = req.session.user
  const cateId = categoryIDs[0].split(",").map(id => parseInt(id))

  const newBook = await Book.create({
    title: title,
    published_year: published_year,
    user_id: id
  });

  cateId.forEach(async id => {
    await BookToCategory.create({
      bookId: newBook.id,
      categoryId: id
    })
  })
  
  res.redirect('/dashboard/user/book')
}

const deleteBook = async (req, res) => {
  await Book.destroy({
    where: {
      id: req.params.id
    },
    cascade: true
  }).catch(err => res.send(err))

  req.session.msg = "Berhasil menghapus buku"
  
  res.redirect('back')
}


export default { getBook, getBookByID, createBook, deleteBook, getAllBook }