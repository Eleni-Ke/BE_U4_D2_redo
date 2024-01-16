//  ************************** USERS RELATED ENDPONTS **************************

/* ************************** USERS CRUD ENDPONTS **************************

1. CREATE -> POST http://localhost:3001/users (+ body)
2. READ -> GET http://localhost:3001/users (+ optional query params)
3. READ -> GET http://localhost:3001/users/:userId
4. UPDATE -> PUT http://localhost:3001/users/:userId (+ body)
5. DELETE -> DELETE http://localhost:3001/users/:userId
*/

import Express from "express";
import uniqid from "uniqid";
import { getUsers, writeUsers } from "../../lib/fs-tools.js";

const usersRouter = Express.Router();

usersRouter.post("/", async (req, res) => {
  const newUser = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
  };
  const users = await getUsers();
  users.push(newUser);
  await writeUsers(users);
  res.status(201).send({ id: newUser.id });
});

usersRouter.get("/", async (req, res) => {
  const fileContentAsBuffer = await getUsers();
  const users = JSON.parse(fileContentAsBuffer);
  res.send(users);
});

usersRouter.get("/:userId", async (req, res) => {
  const usersArray = await getUsers();
  const user = usersArray.find((user) => user.id === req.params.userId);
  res.send(user);
});

usersRouter.put("/:userId", async (req, res) => {
  const usersArray = await getUsers();
  const index = usersArray.findIndex((user) => user.id === req.params.userId);
  const oldUser = usersArray[index];
  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() };
  usersArray[index] = updatedUser;
  await writeUsers(usersArray);
  res.send(updatedUser);
});

usersRouter.delete("/:userId", async (req, res) => {
  const usersArray = await getUsers();
  const remainingUsers = usersArray.filter(
    (user) => user.id !== req.params.userId
  );
  await writeUsers(remainingUsers);
  res.status(204).send();
});

export default usersRouter;
