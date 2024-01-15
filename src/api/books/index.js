import Express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { checkBookSchema, triggerBadRequest } from "./validation.js";

const booksRouter = Express.Router();

const booksJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "books.json"
);

const getBooks = () => JSON.parse(fs.readFileSync(booksJSONPath));
const writeBooks = (books) =>
  fs.writeFileSync(booksJSONPath, JSON.stringify(books));

const aRandomMiddleware = (req, res, next) => {
  console.log("I am a Random middleware!");
  next();
};

booksRouter.post(
  "/",
  aRandomMiddleware,
  checkBookSchema,
  triggerBadRequest,
  (req, res, next) => {
    const books = getBooks();
    const newBook = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uniqid(),
    };
    books.push(newBook);
    writeBooks(books);
    res.status(201).send({ id: newBook.id });

    res.send();
  }
);

booksRouter.get("/", aRandomMiddleware, (req, res, next) => {
  const books = getBooks();
  if (req.query && req.query.category) {
    const filteredBooks = books.filter(
      (book) => book.category === req.query.category
    );
    res.send(filteredBooks);
  }
  res.send(books);
});

booksRouter.get("/:bookId", aRandomMiddleware, (req, res, next) => {
  try {
    const books = getBooks();

    const book = books.find((book) => book.id === re.params.bookId);
    if (book) {
      res.send(book);
    } else {
      next(
        createHttpError(404, `Book with id ${req.params.bookId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

booksRouter.put("/:bookId", (req, res, next) => {
  try {
    const books = getBooks();

    const index = books.findIndex((book) => book.id === req.params.bookId);
    if (index !== -1) {
      const oldBook = books[index];
      const updatedBook = { ...oldBook, ...req.body, updatedAt: new Date() };
      books[index] = updatedBook;
      writeBooks(books);
      res.send(updatedBook);
    } else {
      next(
        createHttpError(404, `Book with id ${req.params.bookId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

booksRouter.delete("/:bookId", (req, res, next) => {
  try {
    const books = getBooks();
    const remainingBooks = books.filter(
      (book) => book.id !== req.params.bookId
    );
    if (books.length !== remainingBooks.length) {
      writeBooks(remainingBooks);
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Book with id ${req.params.bookId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default booksRouter;
