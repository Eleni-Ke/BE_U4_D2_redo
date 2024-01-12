import Express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const booksRouter = Express.Router();

const booksJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "books.json"
);

const getBooks = () => JSON.parse(fs.readFileSync(booksJSONPath));
const writeBooks = (books) =>
  fs.writeFileSync(booksJSONPath, JSON.stringify(books));

booksRouter.post("/", (req, res) => {
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
});

booksRouter.get("/", (req, res) => {
  const books = getBooks();
  res.send(books);
});

booksRouter.get("/:bookId", (req, res) => {
  const books = getBooks();
  const book = books.find((book) => book.id === re.params.bookId);
  res.send(book);
});

booksRouter.put("/:bookId", (req, res) => {
  const books = getBooks();
  const index = books.findIndex((book) => book.id === req.params.bookId);
  const oldBook = books[index];
  const updatedBook = { ...oldBook, ...req.body, updatedAt: new Date() };
  books[index] = updatedBook;
  writeBooks(books);
  res.send(updatedBook);
});

booksRouter.delete("/:bookId", (req, res) => {
  const books = getBooks();
  const remainingBooks = books.filter((book) => book.id !== req.params.bookId);
  writeBooks(remainingBooks);
  res.status(204).send();
});

export default booksRouter;
