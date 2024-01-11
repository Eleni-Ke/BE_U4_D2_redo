//  ************************** USERS RELATED ENDPONTS **************************

/* ************************** USERS CRUD ENDPONTS **************************

1. CREATE -> POST http://localhost:3001/users (+ body)
2. READ -> GET http://localhost:3001/users (+ optional query params)
3. READ -> GET http://localhost:3001/users/:userId
4. UPDATE -> PUT http://localhost:3001/users/:userId (+ body)
5. DELETE -> DELETE http://localhost:3001/users/:userId
*/

import Express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const usersRouter = Express.Router();

const usersJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "users.json"
);

usersRouter.post("/", (req, res) => {
  const newUser = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
  };
  const users = JSON.parse(fs.readFileSync(usersJSONPath));
  users.push(newUser);
  fs.writeFileSync(usersJSONPath, JSON.stringify(users));
  res.status(201).send({ id: newUser.id });
});

usersRouter.get("/", (req, res) => {
  const fileContentAsBuffer = fs.readFileSync(usersJSONPath);
  const users = JSON.parse(fileContentAsBuffer);
  res.send(users);
});

usersRouter.get("/:userId", (req, res) => {
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const user = usersArray.find((user) => user.id === req.params.userId);
  res.send(user);
});

usersRouter.put("/:userId", (req, res) => {
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const index = usersArray.findIndex((user) => user.id === req.params.userId);
  const oldUser = usersArray[index];
  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() };
  usersArray[index] = updatedUser;
  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray));
  res.send(updatedUser);
});

usersRouter.delete("/:userId", (req, res) => {
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const remainingUsers = usersArray.filter(
    (user) => user.id !== req.params.userId
  );
  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers));
  res.status(204).send();
});

export default usersRouter;
