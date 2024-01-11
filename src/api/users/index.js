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
  res.send({ id: newUser.id });
});

usersRouter.get("/", (req, res) => {
  const fileContentAsBuffer = fs.readFileSync(usersJSONPath);
  const users = JSON.parse(fileContentAsBuffer);
  res.send(users);
});

usersRouter.get("/:userId", (req, res) => {
  res.send(" /users");
});

usersRouter.put("/:userId", (req, res) => {
  res.send(" /users");
});

usersRouter.delete("/:userId", (req, res) => {
  res.send(" /users");
});

export default usersRouter;
