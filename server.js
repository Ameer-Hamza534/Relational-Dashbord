// import dependencies
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const session = require("express-session")
const app = express();
const flash = require('connect-flash');
const PORT = 3001;

app.use(flash());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// DATABASE
const sequelize = require("./util/database");

// MODELS
const Book = require("./Models/Book");
const Author = require("./Models/Author");

// import routes
const adminRouter = require("./routes/admin");
const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const userRouter = require("./routes/user");


// Set ejs as a template engine
app.set("view engine", "ejs");
app.set("views", "views");

// path and URL Encoded variables
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// admin router
app.use(adminRouter);
app.use(bookRouter);
app.use(authorRouter);
app.use(userRouter);

// Define Relation
Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: 'authorId' });

// syncing
sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
