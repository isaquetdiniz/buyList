import { createConnection } from "typeorm";

createConnection()
  .then(() => {
    console.log("Succesfully connected with database");
  })
  .catch((er) => {
    console.log("Error connecting to database", er);
  });
