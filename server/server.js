const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
  database: "jazzy_sql",
  host: "localHost",
});

pool.on("connect", () => {
  console.log("Postgresql connected");
});

pool.on("error", (error) => {
  console.log("Error with postgress pool", error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

// TODO - Replace static content with a database tables

app.get("/artist", (req, res) => {
  const sqlText = 'SELECT * FROM artist ORDER BY birthdate DESC;'
  pool.query(sqlText)
    .then((dbRes) => {
      const artistFromDb = dbRes.rows;
      res.send(artistFromDb);
    })
    .catch((dbErr) => {
      console.error(dbErr);
    });
});

app.post("/artist", (req, res) => {
  const newArtist = req.body;
  const sqlText = (`
    INSERT INTO "artist" 
        ("name", "birthdate")
    VALUES
        ($1, $2);
    `);
    const sqlValues = [
        newArtist.name,
        newArtist.birthdate
    ]
    console.log('sqlText');
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
        })
    
});

app.get("/song", (req, res) => {
    const sqlText = 'SELECT * FROM song ORDER BY title DESC'
    pool.query(sqlText)
      .then((dbRes) => {
          const songFromDb = dbRes.rows;
          res.send(songFromDb);
      }).catch((dbErr) => {
          console.error(dbErr);
      });
});

app.post("/song", (req, res) => {
    const newSong = req.body;
    const sqlText = (`
    INSERT INTO "song" 
    ("title", "length", "released")
    VALUES
    ($1, $2, $3);
    `);
    const sqlValues = [
        newSong.title,
        newSong.length,
        newSong.released
    ]
    console.log(sqlText);
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
          res.sendStatus(201);
      }).catch((dbErr) => {
          console.error(dbErr);
      });
});
