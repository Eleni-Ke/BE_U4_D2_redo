import Express from "express";
import listEndpoints from "express-list-endpoints";
import usersRouter from "./api/users/index.js";

const server = Express();
const port = 3001;

server.use(Express.json());

// ********************** ENDPOINTS **********************
server.use("/users", usersRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.table(listEndpoints(server));
});
