const express = require("express")
const router = express.Router()

const AuthorController = require("../Controllers/AuthorController")

router.get("/authors", AuthorController.author)

router.get("/create-author", AuthorController.createAuthor)

router.post("/create-author", AuthorController.storeAuthor)

router.get("/edit-author/:authorId", AuthorController.editAuthor)

router.post("/edit-author", AuthorController.updateAuthor)

router.get("/authors/:authorId", AuthorController.detailAuthor)

router.post("/delete-author", AuthorController.removeAuthor)

module.exports = router