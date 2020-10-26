import "./database/connection";
import { app } from "./app";
import "reflect-metadata";

app.listen(process.env.PORT || 3001, () => {
  console.log(`Ready at port ${process.env.PORT || 3001}`);
});
