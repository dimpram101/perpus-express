import User from "../models/user.js";
import md5 from "blueimp-md5";
import Book from "../models/book.js";

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
  const { id } = req.session.user
  const { password } = req.body

  const userPassword = await User.findOne({
    where: {
      id: id,
      password: md5(password)
    },
    attributes: ['id']
  });

  if (userPassword) {
    req.session.msg = "Password can't be the same like before" 
    return res.redirect("/dashboard/user")
  }

  await User.update({ password: md5(password) }, {
    where: {
      id: id
    }
  }).then(() => {
    req.session.msg = "Berhasil memperbaharui password"
    res.redirect("/dashboard/user")
  })
    .catch(err => res.send("error mengupdate data ", err))
}

export default { getUserByID, createUser, deleteUser, updateUser }