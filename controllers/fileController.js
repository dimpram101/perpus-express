import File from "../models/file.js";
import Book from "../models/book.js";
import User from "../models/user.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/bookFiles/');
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    cb(null, uuidv4()+"."+file.mimetype.split('/').reverse()[0]);
  }
})
const upload = multer({storage:storage})

const getFiles = async (req, res) => {
  const file = await File.findAll({
    include: {
      model: Book
    }
  })

  res.json(file)
}

const insertFile = async (req, res) => {
  const bookId = req.params.id
  const files = req.files
  if (files.length < 1) return res.status(403).send("Bad")

  files.forEach(async file => {
    await File.create({
      book_id: bookId,
      dist: "public",
      path: file.path
    }).catch(err => console.error(err))
  })

  req.session.msg = `Berhasil menambahkan ${files.length} file ke dalam buku`
  res.redirect("/dashboard/user/book")
}

const index = async (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id
    }
  }).then((data) => res.render('insertFile', {book: data}))
    .catch(err => res.send(`Error Query ${err}`))
}

export default { insertFile, upload, index, getFiles }