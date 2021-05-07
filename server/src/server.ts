import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import ip from "ip";
import path from "path";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(3333, () => {
  console.log(
    `Server avaliable on http://localhost:3333/\nor https://${ip.address()}:3333`
  );
});
