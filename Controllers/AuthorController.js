const Author = require("../Models/Author");
const Book = require("../Models/Book");

// render authors
exports.author = (req, res, next) => {
  Author.findAll()
    .then((authors) => {
      res.render("author/authors", {
        authors: authors,
        pageTitle: "Author",
        path: "/authors",
      });
    })
    .catch((err) => console.log(err));
};

// create a new author
exports.createAuthor = (req, res, next) => {
  res.render("author/create-author", {
    pageTitle: "Create Author",
    path: "/create-author",
    editing: false,
  });
};

// store author in the database
exports.storeAuthor = (req, res, next) => {
  const AuthorName = req.body.name;
  const email = req.body.email;
  Author.create({
    name: AuthorName,
    email: email,
  })
    .then((result) => {
      console.log("author stored in database");
      res.redirect("/authors");
    })
    .catch((err) => {
      console.log("err");
    });
};

// edit author
exports.editAuthor = (req, res, next) => {
  const editMood = req.query.edit;
  if (!editMood) {
    return res.redirect("/authors");
  }
  const authorId = req.params.authorId;
  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        return res.redirect("/authors");
      }
      res.render("author/edit-author", {
        pageTitle: "Edit Author",
        path: "/edit-author",
        editing: editMood,
        author: author,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/authors");
    });
};

// update author
exports.updateAuthor = (req, res, next) => {
  const authorId = req.body.authorId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  Author.findByPk(authorId)
    .then((author) => {
      author.name = updatedName;
      author.email = updatedEmail;
      return author.save();
    })
    .then((result) => {
      console.log("Author Details updated");
      res.redirect("/authors");
    })
    .catch((err) => console.log(err));
};

// Author Details
exports.detailAuthor = (req, res, next) => {
  const authorId = req.params.authorId;
  Author.findByPk(authorId)
    .then((author) => {
      Book.findAll({
        where: {
          AuthorId: author.id,
        },
      })
        .then((books) => {
          res.render("author/detail-author", {
            author: author,
            books: books,
            pageTitle: "Author Details",
            path: "/authors",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
// remove author
exports.removeAuthor = (req, res, next) => {
  const authorId = req.body.authorId;
  Author.destroy({ where: { id: authorId } })
    .then((result) => {
      res.redirect("/authors");
    })
    .catch((err) => console.log(err));
};
