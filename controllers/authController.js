import md5 from "blueimp-md5";
import User from "../models/user.js";

const index = (req, res) => {
  let message = req.session.err || "";
  let user = req.session.user
  req.session.err = ""
  
  res.render('users/login', {message: message, user: user})
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
      password: md5(password)
    }
  }).catch(err => {
    req.session.err = "Error QueryDatabase"
    res.redirect('/login')
  })
  
  req.session.err = "";
  if (!user) {
    req.session.err = "Incorrect email or password"
    res.redirect('/login')
  } else {
    req.session.user = user
    res.redirect('/dashboard')
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}

export default { index, login, logout }