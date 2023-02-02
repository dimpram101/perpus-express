import express from "express";
import methodOverride from "method-override";
import session from "express-session";
import route from "./routes/route.js";
// import ejs from "ejs";
import db from "./config/database.js";
import { User, Role, Book, File, Category, BookToCategory, BookImage } from "./models/association.js"
const port = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride(req => req.body._method))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'perpus express anjay mabar',
  cookie: {
    maxAge: 60*60*1000
  },
  saveUninitialized: false,
  resave: false
}))

try {
  await db.authenticate()
  // await db.sync()
  // Role.sync()
  // User.sync()
  // Category.sync()
  // Book.sync()
  // File.sync()
  // BookToCategory.sync()
  // BookImage.sync()
} catch (err) {
  console.error(err)
}

app.use(route)

app.listen(port, () => {
  console.log(`server running at http://localhost:` + port)
})
