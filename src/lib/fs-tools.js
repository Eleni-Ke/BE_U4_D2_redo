import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const usersJSONPath = join(dataFolderPath, "users.json");
const booksJSONPath = join(dataFolderPath, "books.json");

export const getUsers = () => readJSON(usersJSONPath);
export const writeUsers = (users) => writeJSON(usersJSONPath, users);
export const getBooks = () => readJSON(booksJSONPath);
export const writeBooks = (books) => writeJSON(booksJSONPath, books);
