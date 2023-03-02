const express = require("express");
const router = express.Router();
const BookController = require("../Controllers/BookController");
const multer = require("multer");
const path = require("path");

// //////////////////////////////////
// multer storage declare
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/books");
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// /////////////////////////////////

router.get("/books", BookController.book);

router.get("/create-book", BookController.createBook);

router.post("/create-book", upload.single('image'), BookController.storeBook)

router.get("/edit-book/:bookId", BookController.editBook)

router.post("/edit-book", BookController.updateBook)

router.get("/books/:bookId", BookController.detailBook)

router.post("/delete-book", BookController.deleteBook)

module.exports = router;
