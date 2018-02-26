CREATE TABLE photos ( 
	id serial primary key,
	img VARCHAR (10000),
    like_count integer DEFAULT 0,
	view_count integer DEFAULT 0,
    description VARCHAR (600),
    title VARCHAR (80)
);



CREATE TABLE comments (
	comments VARCHAR (500),
	photo_id integer references photos,
	author VARCHAR (80)
	);