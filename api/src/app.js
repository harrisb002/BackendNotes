import express from "express";
import Database from "better-sqlite3";
import favorites from "./routes/favorites.js";

const db = new Database("api/src/favorites.db");
const app = express();
const port = 3000;

// Apply middleware before using routes
// Accept info passed in the body
app.use(express.json());

// Defining it above the below definition would
//  have it affect both the routes file as well as this one
// app.use((req, res, next) => {
//   console.log("Applying middleware before using favorites routes");
//   next();
// });

// Now after middleware applied, now use routes defined in favorites
app.use("/favorites", favorites);

// app.use((req, res, next) => {
//   console.log("Applying middleware after using favorites routes");
//     next();
//   });

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "sqliteError") {
    console.log("Db error hit.");
  }
  // Pass err just in case other error handling code exists
  next(err); // Goes to default error handler
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
