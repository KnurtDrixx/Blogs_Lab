import * as express from "express";
import * as path from "path";
import Routes from "./routes";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(Routes);

app.use("*", (req, res) => {
  const indexHTML = path.join(__dirname, "../public/index.html");
  res.sendFile(indexHTML);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
