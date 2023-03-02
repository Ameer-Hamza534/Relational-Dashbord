const Book = require("../Models/Book");
const Author = require("../Models/Author");

// render all books
exports.book = (req, res, next) => {
  Book.findAll({ include: [Author] })
    .then((books) => {
      res.render("book/books", {
        books: books,
        pageTitle: "Books",
        path: "/books",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// create new book
exports.createBook = (req, res, next) => {
  Author.findAll()
    .then((authors) => {
      res.render("book/create-book", {
        pageTitle: "Create Book",
        path: "/create-book",
        authors: authors,
      });
    })
    .catch((err) => console.log(err));
};

// Store Book in Database
exports.storeBook = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const isbn = req.body.isbn;
  const image = req.file.filename;
  const authorId = req.body.author;
  Book.create({
    title: title,
    description: description,
    category: category,
    isbn: isbn,
    image: image,
    authorId: authorId[0],
  })
    .then((result) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Edit Book
exports.editBook = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/books");
  }
  const bookId = req.params.bookId;
  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        return res.redirect("/books");
      }
      Author.findAll({
        where: { id: book.authorId },
      })
        .then((authors) => {
          res.render("book/edit-book", {
            pageTitle: "Edit Book",
            path: "/edit-book",
            editing: editMode,
            book: book,
            authors: authors,
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/books");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/books");
    });
};

// update book
exports.updateBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;
  const updatedCategory = req.body.category;
  const updatedIsbn = req.body.isbn;
  const updatedImage = req.body.image;
  const updatedAuthor = req.body.author;
  Book.findByPk(bookId)
    .then((book) => {
      book.title = updatedTitle;
      book.description = updatedDesc;
      book.category = updatedCategory;
      book.isbn = updatedIsbn;
      book.image = updatedImage;
      book.author = updatedAuthor;
      return book.save();
    })
    .then((result) => {
      console.log("Book Update SuccessFully");
      res.redirect("/books");
    })
    .catch((err) => console.log(err));
};

// detail
exports.detailBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findAll({
    where: { id: bookId },
    include: Author,
  })
    .then((books) => {
      res.render("book/detail-book", {
        book: books[0],
        pageTitle: "Book Detail",
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

// Delete Book
exports.deleteBook = (req, res, next) => {
  const bookId = req.body.bookId;
  Book.destroy({ where: { id: bookId } })
    .then((result) => {
      res.redirect("/books");
    })
    .catch((err) => console.log(err));
};
