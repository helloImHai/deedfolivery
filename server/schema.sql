-- Create base and solution tables. Load data into solution tables.

DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS Riders CASCADE;
DROP TABLE IF EXISTS Managers CASCADE;
DROP TABLE IF EXISTS Sells CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Places CASCADE;
DROP TABLE IF EXISTS Lists CASCADE;
DROP TABLE IF EXISTS Assigns CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS ROffers CASCADE;
DROP TABLE IF EXISTS MOffers CASCADE;
DROP TABLE IF EXISTS Claims CASCADE;
DROP TABLE IF EXISTS FullTimers CASCADE;
DROP TABLE IF EXISTS PartTimers CASCADE;
DROP TABLE IF EXISTS FWorks CASCADE;
DROP TABLE IF EXISTS PWorks CASCADE;
DROP TABLE IF EXISTS Weeks CASCADE;
DROP TABLE IF EXISTS Intervals CASCADE;

CREATE TABLE Customers (
    cid             SERIAL PRIMARY KEY,
    cname           VARCHAR(50),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(50),
    password        VARCHAR(16),
    address         VARCHAR(80),
    points          INTEGER,
    card            INTEGER
);

CREATE TABLE Restaurants (
    rid             SERIAL PRIMARY KEY,
    rname           VARCHAR(50),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(50),
    password        VARCHAR(16),
    address         VARCHAR(80),
    minSpend        INTEGER
);

CREATE TABLE Riders (
    riderid         SERIAL PRIMARY KEY,
    ridername       VARCHAR(50),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(50),
    password        VARCHAR(16),
    delivered       INTEGER
);

CREATE TABLE Managers (
	mid 			SERIAL PRIMARY KEY,
    mname           VARCHAR(50),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(50),
    password        VARCHAR(16)
);

CREATE TABLE Sells (
    iid             SERIAL PRIMARY KEY,
    rid             INTEGER NOT NULL,
    item            VARCHAR(50) NOT NULL,
    price           FLOAT,
    quantity        INTEGER,
    category        VARCHAR(50),
    UNIQUE (rid, item),
    FOREIGN KEY (rid) REFERENCES Restaurants ON DELETE CASCADE
);

CREATE TABLE Orders (
    oid             SERIAL PRIMARY KEY,
    payType         VARCHAR(5),
    card            INTEGER,
    cost            FLOAT,
    reward          INTEGER,
    address         VARCHAR(80)
);

CREATE TABLE Reviews (
    cid             INTEGER,
    oid             INTEGER UNIQUE,
    review          VARCHAR(250),
    rating          INTEGER,
    PRIMARY KEY (cid, oid),
    FOREIGN KEY (cid) REFERENCES Customers ON DELETE CASCADE,
    FOREIGN KEY (oid) REFERENCES Orders ON DELETE CASCADE
);

CREATE TABLE Places (
    cid             INTEGER,
    oid             INTEGER UNIQUE,
    ordertime       TIMESTAMP,
    PRIMARY KEY (cid, oid),
    FOREIGN KEY (cid) REFERENCES Customers,
    FOREIGN KEY (oid) REFERENCES Orders
);

CREATE TABLE Lists (
    oid             INTEGER,
    iid             INTEGER,
    quantity        INTEGER,
    PRIMARY KEY (oid, iid),
    FOREIGN KEY (oid) REFERENCES Orders ON DELETE CASCADE,
    FOREIGN KEY (iid) REFERENCES Sells ON DELETE CASCADE
);

CREATE TABLE Assigns (
    oid             INTEGER,
    mid             INTEGER,
    riderid         INTEGER,
    acceptTime      TIMESTAMP,
    reachedTime     TIMESTAMP,
    leaveTime       TIMESTAMP,
    deliveryTime    TIMESTAMP,
    managerFee      FLOAT,
    riderFee        FLOAT,
    PRIMARY KEY (oid),
    FOREIGN KEY (mid) REFERENCES Managers,
    FOREIGN KEY (oid) REFERENCES Orders,
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Promotions (
    pid             INTEGER,
    category        VARCHAR(20),
    value           FLOAT,
    startDate       DATE,
    endDate         DATE,
    PRIMARY KEY (pid),
    check (startDate < endDate)
);

CREATE TABLE ROffers (
    pid             INTEGER,
    rid             INTEGER,
    PRIMARY KEY (pid, rid),
    FOREIGN KEY (pid) REFERENCES Promotions,
    FOREIGN KEY (rid) REFERENCES Restaurants
);

CREATE TABLE MOffers (
    pid             INTEGER,
    mid             INTEGER,
    PRIMARY KEY (pid, mid),
    FOREIGN KEY (pid) REFERENCES Promotions,
    FOREIGN KEY (mid) REFERENCES Managers
);

CREATE TABLE Claims (
    oid             INTEGER,
    pid             INTEGER,
    PRIMARY KEY (oid, pid)
);

CREATE TABLE FullTimers (
    riderid         INTEGER,
    monthSalary     INTEGER,
    PRIMARY KEY (riderid),
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Weeks (
    wid             INTEGER,
    daysOption      INTEGER
                    check (daysOption in (1,2,3,4,5,6,7)),
    day1shift       INTEGER
                    check (day1shift in (1,2,3,4)),
    day2shift       INTEGER
                    check (day2shift in (1,2,3,4)),
    day3shift       INTEGER
                    check (day3shift in (1,2,3,4)),
    day4shift       INTEGER
                    check (day4shift in (1,2,3,4)),
    day5shift       INTEGER
                    check (day5shift in (1,2,3,4)),
    PRIMARY KEY (wid)
);

CREATE TABLE FWorks (
    riderid         INTEGER,
    wid             INTEGER,
    PRIMARY KEY (riderid),
    FOREIGN KEY (riderid) REFERENCES Riders,
    FOREIGN KEY (wid) REFERENCES Weeks
);

CREATE TABLE PartTimers (
    riderid         INTEGER,
    weekSalary      INTEGER,
    weekHours       INTEGER,
    PRIMARY KEY (riderid),
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Intervals (
    intervalid      INTEGER,
    day             VARCHAR(50)
                    check (day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    startTime       INTEGER,
    endTime         INTEGER,
    PRIMARY KEY (intervalid),
    check (startTime < endTime)
);

CREATE TABLE PWorks (
    riderid         INTEGER,
    intervalid      INTEGER,
    PRIMARY KEY (riderid, intervalid),
    FOREIGN KEY (riderid) REFERENCES PartTimers,
    FOREIGN KEY (intervalid) REFERENCES Intervals
);

---------------------- POPULATE DATA ------------------------------------------------------------------------

INSERT INTO Customers(cname, username, email, password, address, points, card) VALUES
    ('Duong', 'duong', 'duong@gmail.com', 'duongpass', '51 PHT', 0, 1234),
    ('Hai', 'hai', 'hai@gmail.com', 'haipass', '15 Balmoral Park', 0, 2345),
    ('Hung', 'hung', 'hung@gmail.com', 'hungpass', '6 Tembusu', 0, 3456),
    ('Hoang', 'hoang', 'hoang@gmail.com', 'hoangpass', 'nigga', 0, 4567),
    ('Christian', 'cjw', 'christian@gmail.com', 'christianpass', 'amortized', 0, 2345);

INSERT INTO Restaurants(rname, username, email, password, address, minspend) VALUES
    ('KFC', 'kfc', 'kfc@gmail.com', 'kfcpass', '123 KFC', 5),
    ('Burger King', 'bk', 'bk@gmail.com', 'bkpass', '123 Burger King', 7),
    ('McDonald', 'md', 'md@gmail.com', 'mdpass', '123 McDonal', 5),
    ('Starbucks', 'sb', 'sb@gmail.com', 'sbpass', '123 Starbucks', 10),
    ('Koi', 'koi', 'koi@gmail.com', 'koipass', '123 Koi', 8);

INSERT INTO Riders(ridername, username, email, password, delivered) VALUES
    ('Tom Rider', 'tom', 'tom@gmail.com', 'tompass', 0),
    ('Jerry Rider', 'jerry', 'jerry@gmail.com', 'jerrypass', 0),
    ('Free Rider', 'free', 'free@gmail.com', 'freepass', 0),
    ('Ghost Rider', 'ghost', 'ghost@gmail.com', 'ghostpass', 0),
    ('Flynn Rider', 'flynn', 'flynn@gmail.com', 'flynnpass', 0),
    ('Grab Rider', 'grab', 'grab@gmail.com', 'grabpass', 0);

INSERT INTO Managers(mname, username, email, password) VALUES
    ('Boss', 'boss', 'boss@gmail.com', 'bosspass'),
    ('Chief', 'chief', 'chief@gmail.com', 'chiefpass'),
    ('Man', 'man', 'man@gmail.com', 'manpass'),
    ('Ager', 'ager', 'ager@gmail.com', 'agerpass'),
    ('CJW', 'cjw', 'cjw@gmail.com', 'cjwpass');

INSERT INTO Sells(rid, item, price, quantity, category) VALUES
    (1, 'chicken', 5, 100, 'main'),
    (1, 'ice cream', 2, 100, 'dessert'),
    (2, 'burger', 6, 100, 'main'),
    (2, 'coke', 3, 100, 'drink'),
    (3, 'burger', 5, 100, 'main'),
    (3, 'coke', 2, 100, 'drink'),
    (4, 'coffee', 6, 100, 'hot'),
    (4, 'frape', 6, 100, 'cold'),
    (5, 'tea', 4, 100, 'cold'),
    (5, 'coffe', 4, 100, 'hot');

INSERT INTO Orders(paytype, card, cost, reward, address) VALUES
    ('cash', null, 8, 7, '15 Balmoral Park'),
    ('cash', null, 12, 9, '15 Balmoral Park'),
    ('card', 2345, 10, 7, '15 Balmoral Park'),
    ('cash', null, 11, 12, 'SOC'),
    ('card', 1234, 11, 8, 'Eusoff');

INSERT INTO Lists VALUES
    (1, 1, 1),
    (1, 2, 1),
    (2, 3, 1),
    (2, 4, 1),
    (3, 5, 1),
    (3, 6, 1),
    (4, 7, 1),
    (4, 8, 1),
    (5, 9, 1),
    (5, 10, 1);

INSERT INTO Places VALUES
    (2, 1, '2020-04-15 10:23:54'),
    (2, 2, '2020-04-15 10:23:54'),
    (2, 3, '2020-04-15 10:23:54'),
    (1, 4, '2020-04-15 10:23:54'),
    (1, 5, '2020-04-15 10:23:54');

INSERT INTO Reviews VALUES
    (2, 1, 'wow very good', 5),
    (2, 2, 'wow good', 4),
    (2, 3, 'good', 3),
    (1, 4, 'nicee', 5),
    (1, 5, 'not bad', 4);

INSERT INTO Assigns VALUES 
    (1, 1, 1, null, null, null, null, 2, 1),
    (2, 2, 4, null, null, null, null, 2, 1),
    (3, 3, 1, null, null, null, null, 2, 1),
    (5, 5, 1, null, null, null, null, 2, 1);

INSERT INTO Promotions VALUES
    (1, 'abc', 2, '2020-04-15', '2020-12-15'),
    (2, 'xyz', 3, '2020-03-15', '2020-11-15'),
    (3, '123', 1, '2020-03-16', '2020-11-16'),
    (4, '456', 4, '2020-04-16', '2020-12-16');

INSERT INTO ROffers VALUES
    (1, 1), (2, 3);

INSERT INTO MOffers VALUES
    (3, 4), (4, 4);

INSERT INTO Claims VALUES
    (1, 1), (4, 4);

INSERT INTO FullTimers VALUES
    (1, 1500), (3, 2000), (5, 1750);

INSERT INTO Weeks VALUES
    (1, 1, 1, 1, 1, 1, 1),
    (2, 4, 1, 3, 3, 4, 2),
    (3, 2, 3, 1, 2, 2, 4);

INSERT INTO FWorks VALUES
    (1, 1), (2, 2), (3, 3);

INSERT INTO PartTimers VALUES
    (2, 300, 30), (4, 440, 44), (6, 350, 35);

INSERT INTO Intervals VALUES
    (1, 'Monday', 10, 13),
    (2, 'Monday', 16, 18),
    (3, 'Monday', 19, 20),
    (4, 'Tuesday', 10, 13),
    (5, 'Tuesday', 16, 18),
    (6, 'Tuesday', 19, 20),
    (7, 'Wednesday', 10, 13),
    (8, 'Wednesday', 16, 18),
    (9, 'Wednesday', 19, 20),
    (10, 'Thursday', 10, 13),
    (11, 'Thursday', 16, 18),
    (12, 'Thursday', 19, 20),
    (13, 'Saturday', 10, 13),
    (14, 'Saturday', 17, 20),
    (15, 'Sunday', 10, 13),
    (16, 'Sunday', 17, 20);

INSERT INTO PWorks VALUES
    (2, 1), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
    (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11), (4, 12), (4, 13), (4, 14), (4, 15), (4, 16),
    (6, 1), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11), (6, 12), (6, 15);

