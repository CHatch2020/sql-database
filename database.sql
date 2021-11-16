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

INSERT INTO "artist" 
("name", "birthdate")
VALUES
('', '');

INSERT INTO "song" 
("title", "length", "released")
VALUES
('', '', '');