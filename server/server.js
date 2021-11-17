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
// get table rows from database and send to client
app.get("/artist", (req, res) => {
        // get the working sql code to grab artists from DB
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
// send artists to database
app.post("/artist", (req, res) => {
  const newArtist = req.body;
  // grab the working sql code for songs
  const sqlText = (`
    INSERT INTO "artist" 
        ("name", "birthdate")
    VALUES
        ($1, $2);
    `);
    // assign the data to vlues to be pushed into the DB table
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
// get table rows from database and send to client
app.get("/song", (req, res) => {
    // get the working sql code to grab songs from DB
    const sqlText = 'SELECT * FROM song ORDER BY title DESC'
    pool.query(sqlText)
      .then((dbRes) => {
          const songFromDb = dbRes.rows;
          res.send(songFromDb);
      }).catch((dbErr) => {
          console.error(dbErr);
      });
});
// send songs to database
app.post("/song", (req, res) => {
    const newSong = req.body;
    // grab the working sql code for songs
    const sqlText = (`
    INSERT INTO "song" 
    ("title", "length", "released")
    VALUES
    ($1, $2, $3);
    `);
        // assign the data to vlues to be pushed into the DB table
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
