import Book from "./book.js";
import BookToCategory from "./book_to_category.js";
import Category from "./category.js";
import File from "./file.js";
import Role from "./role.js";
import User from "./user.js";

User.belongsTo(Role, {
  foreignKey: "role_id"
});

User.hasMany(Book, {
  foreignKey: "user_id"
});

Book.hasMany(File, {
  foreignKey: "book_id"
})

Book.belongsToMany(Category, { through: BookToCategory });
Category.belongsToMany(Book, { through: BookToCategory });

export { User, Role, Book, File, Category, BookToCategory };