const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const Response = require("./response");
const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};
var bcrypt = require("bcryptjs");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "112233",
  database: "mymovielist",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});
app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your allowed origin
    credentials: true, // Set to true if the API sends cookies
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hi there");
});

app.post("/getuser", async (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (error, users) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json(error);
      }

      if (users.length === 0) {
        return res.status(HttpStatus.NOT_FOUND.code).send(
          new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
            usernameError: "username not found",
          })
        );
      }

      const passwordMatch = await bcrypt.compare(password, users[0].password);
      if (!passwordMatch) {
        return res.status(HttpStatus.NOT_FOUND.code).send(
          new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
            passwordError: "password wrong",
          })
        );
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "you are sign in"
          )
        );
    }
  );
});

app.post("/adduser", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = crypto.randomUUID();
  console.log(username, password, id);
  connection.query(
    "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
    [id, username, hashedPassword],
    (error) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(
              new Response(
                HttpStatus.INTERNAL_SERVER_ERROR.code,
                HttpStatus.INTERNAL_SERVER_ERROR.status,
                "username is already exist"
              )
            );
        }
        return res.status(500).json(error);
      }

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, "user added", {
          username,
        })
      );
    }
  );
});

app.get("/getMovies/:username", (req, res) => {
  const { username } = req.params;
  connection.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (error, users) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res
          .status(500)
          .json({ errorMessage: "Error fetching movies", error });
      }

      if (users.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND.code)
          .send(
            new Response(
              HttpStatus.NOT_FOUND.code,
              HttpStatus.NOT_FOUND.status,
              "User not found"
            )
          );
      }

      connection.query(
        "SELECT * FROM userMovies WHERE userId = ?",
        [users[0].id],
        (error, movies) => {
          if (error) {
            console.error("Error fetching movies:", error);
            return res
              .status(500)
              .json({ errorMessage: "Error fetching movies", error });
          }

          res
            .status(HttpStatus.OK.code)
            .send(
              new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                `${username} movies are selected`,
                movies
              )
            );
        }
      );
    }
  );
});

app.post("/addmovie", (req, res) => {
  const { username, movieSelectMovie } = req.body;
  const { Title, Year, imdbID, Type, Poster } = movieSelectMovie;

  connection.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (error, users) => {
      if (error)
        return res.status(500).json({ errorMessage: "can't add movie", error });

      connection.query(
        "SELECT * FROM userMovies WHERE userId = ? AND movie_id = ?",
        [users[0].id, imdbID],
        (error, existingMovies) => {
          if (error)
            return res
              .status(500)
              .json({ errorMessage: "can't add movie", error });

          if (existingMovies.length === 0) {
            connection.query(
              "INSERT INTO userMovies (movie_id, title, year, type, poster, userId) VALUES (?, ?, ?, ?, ?, ?)",
              [imdbID, Title, Year, Type, Poster, users[0].id],
              (error, result) => {
                if (error)
                  return res
                    .status(500)
                    .json({ errorMessage: "can't add movie", error });

                res
                  .status(HttpStatus.CREATED.code)
                  .send(
                    new Response(
                      HttpStatus.CREATED.code,
                      HttpStatus.CREATED.status,
                      "movie added to the user list",
                      result
                    )
                  );
              }
            );
          } else {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  "you add this movie to your list"
                )
              );
          }
        }
      );
    }
  );
});
app.listen(3100, () => {
  console.log("open on port 3100");
});
