import User from "../models/user.js";
import md5 from "blueimp-md5";
import Book from "../models/book.js";

const getUser = async (req, res) => {
  const user = await User.findAll();
  res.send(user);
}

const getUserByID = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({
    where: { id: id },
    include: [
      {
        model: Book,
      }
    ]
  });
  res.send(user);
}

const createUser = (req, res) => {
  const { name, role_id, email, password } = req.body
  const hashedPassword = md5(password)
  User.create({
    role_id: role_id,
    name: name,
    email: email,
    password: hashedPassword
  }).then(() => res.send("Berhasil membuat user"))
    .catch(err => res.send("Gagal membuat user", err))
}

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("Berhasil menghapus user"))
    .catch(err => res.send("Gagal menghapus user", err))
}

const updateUser = async (req, res) => {
  await User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => res.send("berhasil mengupdate user"))
    .catch(err => res.send("error mengupdate data", err))
}

export default { getUser, getUserByID, createUser, deleteUser, updateUser }