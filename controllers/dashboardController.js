const index = (req , res) => {
  const user = req.session.user
  res.render("dashboard/dashboard-index", {user: user})
}

export default { index }