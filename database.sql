CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(80) not null,
    "birthdate" date
);


CREATE TABLE "song" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(255),
	"length" varchar(10),
	"released" date
);
-- insert a new artist
INSERT INTO "artist" 
("name", "birthdate")
VALUES
('', '');
-- insert new song
INSERT INTO "song" 
("title", "length", "released")
VALUES
('', '', '');
-- order artists by age, youngest - oldest
SELECT * FROM artist
ORDER BY birthdate DESC

SELECT * FROM song 
ORDER BY title DESC