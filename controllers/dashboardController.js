const index = (req , res) => {
  const user = req.session.user
  const msg = req.session.msg || ""
  req.session.msg = ""
  res.render("dashboard/dashboard-index", {user: user, message: msg})
}

const userProfile = async (req, res) => {
  const user = req.session.user
  const msg = req.session.msg || ""
  req.session.msg = ""
  res.render('dashboard/user-profile', {user: user, message: msg})
}

export default { index, userProfile }