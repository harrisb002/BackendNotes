import express from "express";
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hey There");
}); 

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
