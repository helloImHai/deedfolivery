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
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(50),
    password        VARCHAR(16),
    delivered       INTEGER
);

CREATE TABLE Managers (
	mid 			SERIAL PRIMARY KEY,
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
    oid             INTEGER,
    review          VARCHAR(250),
    rating          INTEGER,
    PRIMARY KEY (cid, oid),
    FOREIGN KEY (cid) REFERENCES Customers ON DELETE CASCADE,
    FOREIGN KEY (oid) REFERENCES Orders ON DELETE CASCADE
);

CREATE TABLE Places (
    cid             INTEGER,
    oid             INTEGER,
    ordertime       VARCHAR(50),
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
    oid             INTEGER,
    riderid         INTEGER,
    acceptTime      VARCHAR(50),
    reacheTime      VARCHAR(50),
    leaveTime       VARCHAR(50),
    deliveryTime    VARCHAR(50),
    managerFee      FLOAT,
    riderFee        FLOAT,
    PRIMARY KEY (mid, oid, riderid),
    FOREIGN KEY (mid) REFERENCES Managers,
    FOREIGN KEY (oid) REFERENCES Orders,
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Promotions (
    pid             INTEGER,
    category        VARCHAR(20),
    value           FLOAT,
    startDate       VARCHAR(50),
    endDate         VARCHAR(50),
    PRIMARY KEY (pid)
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
    daysOption      INTEGER, --must belong to 1 of 7 options: Monday to Friday, Tuesday to Saturday, Wednesday to Sunday, Thursday to Monday, Friday to Tuesday, Saturday to Wednesday, or Sunday to Thursday.
    day1shift       INTEGER,
    day2shift       INTEGER,
    day3shift       INTEGER,
    day4shift       INTEGER,
    day5shift       INTEGER,
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
    day             VARCHAR(50),
    startTime       INTEGER,
    endTime         INTEGER,
    PRIMARY KEY (intervalid)
);

CREATE TABLE PWorks (
    riderid         INTEGER,
    intervalid      INTEGER,
    PRIMARY KEY (riderid, intervalid),
    FOREIGN KEY (riderid) REFERENCES PartTimers,
    FOREIGN KEY (intervalid) REFERENCES Intervals
);