import express from "express";
import ejs from "ejs";
import methodOverride from "method-override";
import db from "./config/database.js";
import { User, Role, Book, File, Category, BookToCategory } from "./models/association.js"
import route from "./routes/route.js";
const port = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride(req => req.body._method))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.get('/', async (req, res) => {
  res.send("test")
})

try {
  await db.authenticate()
  User.sync()
  Role.sync()
  Book.sync()
  File.sync()
  Category.sync()
  BookToCategory.sync()
} catch (err) {
  console.error(err)
}

app.use(route)

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})