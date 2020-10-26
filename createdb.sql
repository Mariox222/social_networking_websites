CREATE TABLE social_network
(
  name VARCHAR(100) NOT NULL,
  year_founded INT,
  headquarters VARCHAR(100),
  employees INT,
  owner VARCHAR(100),
  website VARCHAR(100) NOT NULL,
  users FLOAT,
  registration_required INT,
  networkID INT NOT NULL,
  PRIMARY KEY (networkID)
);

CREATE TABLE person
(
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  personID INT NOT NULL,
  PRIMARY KEY (personID)
);

CREATE TABLE founder
(
  personID INT NOT NULL,
  networkID INT NOT NULL,
  PRIMARY KEY (personID, networkID),
  FOREIGN KEY (personID) REFERENCES person(personID),
  FOREIGN KEY (networkID) REFERENCES social_network(networkID)
);

-- name, year_founded, headquarters, employees, owner, website, users, registration, networkid
insert into social_network
values ('23snaps', 2012, 'London, United Kingdom', 20, '23snaps', 'www.23snaps.com', 500000, 1, 1);

insert into social_network
values ('Facebook', 2004, 'Menlo Park, California', 52000, 'Facebook, Inc.', 'www.facebook.com', 2600000000, 1, 2);

insert into social_network
values ('Instagram', 2010, 'Menlo Park, US', NULL, 'Facebook, Inc.', 'www.instagram.com', 1000000000, 1, 3);

insert into social_network
values ('Discord', 2015, 'San Francisco, US', 592, 'Discord', 'www.discord.com', 100000000, 1, 4);

insert into social_network
values ('Twitter', 2006, 'San Francisco, US', 4900, 'Twitter', 'www.twitter.com', 326000000, 1, 5);

insert into social_network
values ('Reddit', 2005, 'San Francisco, US', 400, 'Advance Publications', 'www.reddit.com', 430000000, 0, 6);

insert into social_network
values ('Snapchat', 2011, 'Santa Monica, US', 3195, 'Snap', 'www.snapchat.com', 397000000, 1, 7);

insert into social_network
values ('Pinterest', 2009, 'San Francisco, US', 2217, 'Pinterest', 'www.pinterest.com', 367000000, 1, 8);

insert into social_network
values ('Tumblr', 2007, 'New York, US', 400, 'Automattic', 'www.tumblr.com', 23000000, 0, 9);

insert into social_network
values ('YouTube', 2005, 'San Bruno, US', 2000, 'Google', 'www.youtube.com', 2000000000, 0, 10);


--first last personID
--23snaps
insert into person
values ('Ivailo', 'Jordanov', 1);

insert into person
values ('Yury', 'Tereshchenko', 2);

--facebook
insert into person
values ('Mark', 'Zuckerberg', 3);

--instagram 
insert into person
values ('Kevin', 'Systrom', 4);

insert into person
values ('Mike', 'Krieger', 5);

--discord
insert into person
values ('Jason', 'Citron', 6);

--twitter
insert into person
values ('Jack', 'Dorsey', 7);

insert into person
values ('Noah', 'Glass', 8);

insert into person
values ('Biz', 'Stone', 9);

insert into person
values ('Evan', 'Williams', 10);

--reddit
insert into person
values ('Steve', 'Huffman', 11);

insert into person
values ('Aaron', 'Swartz', 12);

insert into person
values ('Alexis', 'Ohanian', 13);

--snapchat
insert into person
values ('Reggie', 'Brown', 14);

insert into person
values ('Evan', 'Spiegel', 15);

insert into person
values ('Bobby', 'Murphy', 16);

--pinterest
insert into person
values ('Ben', 'Silbermann', 17);

insert into person
values ('Paul', 'Sciarra', 18);

insert into person
values ('Evan', 'Sharp', 19);

--tumblr
insert into person
values ('David', 'Karp', 20);

--youtube
insert into person
values ('Chad', 'Hurley', 21);

insert into person
values ('Steve', 'Chen', 22);

insert into person
values ('Jawed', 'Karim', 23);

--personID networkID

insert into founder
values (1,1);

insert into founder
values (2,1);

insert into founder
values (3,2);

insert into founder
values (4,3);

insert into founder
values (5,3);

insert into founder
values (6,4);

insert into founder
values (7,5);

insert into founder
values (8,5);

insert into founder
values (9,5);

insert into founder
values (10,5);

insert into founder
values (11,6);

insert into founder
values (12,6);

insert into founder
values (13,6);

insert into founder
values (14,7);

insert into founder
values (15,7);

insert into founder
values (16,7);

insert into founder
values (17,8);

insert into founder
values (18,8);

insert into founder
values (19,8);

insert into founder
values (20,9);

insert into founder
values (21,10);

insert into founder
values (22,10);

insert into founder
values (23,10);

