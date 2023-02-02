import Book from "./book.js";
import BookImage from "./book_image.js";
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

Book.belongsTo(User, {
  foreignKey: "user_id"
})

Book.hasMany(File, {
  foreignKey: {
    name: "book_id",
    allowNull: false
  },
  onDelete: "CASCADE"
})

File.belongsTo(Book, {
  foreignKey: "book_id"
})

Book.hasOne(BookImage, {
  foreignKey: {
    name: "book_id",
    allowNull: false
  },
  onDelete: "CASCADE"  
})

BookImage.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE"  
})


Book.belongsToMany(Category, { through: BookToCategory });
Category.belongsToMany(Book, { through: BookToCategory });

export { User, Role, Book, File, Category, BookToCategory, BookImage };