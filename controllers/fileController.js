import File from "../models/file.js";
import Book from "../models/book.js";
import User from "../models/user.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/bookFiles/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({storage:storage})

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

  res.send("Berhasil menambah file")
}

const index = async (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id
    }
  }).then((data) => res.render('insertFile', {book: data}))
    .catch(err => res.send(`Error Query ${err}`))
}

export default { insertFile, upload, index }