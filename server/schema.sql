-- Create base and solution tables. Load data into solution tables.

DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS Riders CASCADE;
DROP TABLE IF EXISTS Managers CASCADE;
DROP TABLE IF EXISTS Items CASCADE;
DROP TABLE IF EXISTS Sells CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Places CASCADE;
DROP TABLE IF EXISTS Lists CASCADE;
DROP TABLE IF EXISTS Employs CASCADE;
DROP TABLE IF EXISTS Assigns CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS ROffers CASCADE;
DROP TABLE IF EXISTS MOffers CASCADE;
DROP TABLE IF EXISTS Claims CASCADE;
DROP TABLE IF EXISTS FullTimers CASCADE;
DROP TABLE IF EXISTS PartTimers CASCADE;
DROP TABLE IF EXISTS MWS CASCADE;
DROP TABLE IF EXISTS WWS CASCADE;
DROP TABLE IF EXISTS Shifts CASCADE;
DROP TABLE IF EXISTS MonthConsists CASCADE;
DROP TABLE IF EXISTS WeekContains CASCADE;
DROP TABLE IF EXISTS FMaintains CASCADE;
DROP TABLE IF EXISTS PMaintains CASCADE;

CREATE TABLE Customers (
    cid             SERIAL PRIMARY KEY,
    cname           VARCHAR(50),
    username        VARCHAR(10) UNIQUE,
    email           VARCHAR(50),
    password        VARCHAR(16),
    address         VARCHAR(80),
    points          INTEGER,
    card            INTEGER
);

CREATE TABLE Restaurants (
    rid             SERIAL PRIMARY KEY,
    rname           VARCHAR(50),
    username        VARCHAR(10) UNIQUE,
    email           VARCHAR(50),
    password        VARCHAR(16),
    address         VARCHAR(80),
    minspend        INTEGER
);

CREATE TABLE Riders (
    riderid         SERIAL PRIMARY KEY,
    username        VARCHAR(10) UNIQUE,
    email           VARCHAR(50),
    password        VARCHAR(16),
    delivered       INTEGER
);

CREATE TABLE Managers (
	mid 			SERIAL PRIMARY KEY,
    username        VARCHAR(10) UNIQUE,
    email           VARCHAR(50),
    password        VARCHAR(16)
);

CREATE TABLE Sells (
    rid             INTEGER,
    iid             SERIAL,
    FOREIGN KEY (rid) REFERENCES Restaurants,
    iname           VARCHAR(10),
    price           FLOAT,
    stock           INTEGER,
    quota           INTEGER,
    category        VARCHAR(10),
    PRIMARY KEY (iid, rid)
);

CREATE TABLE Orders (
    oid             SERIAL PRIMARY KEY,
    paytype         VARCHAR(5),
    card            INTEGER,
    cost            FLOAT,
    reward          INTEGER,
    address         VARCHAR(80)
);

CREATE TABLE Reviews (
    reviewid        INTEGER,
    foodReview      VARCHAR(250),
    deliveryRating  INTEGER
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
    rid             INTEGER,
    iid             INTEGER,
    PRIMARY KEY (oid, rid, iid),
    FOREIGN KEY (oid) REFERENCES Orders,
    FOREIGN KEY (rid) REFERENCES Restaurants,
    FOREIGN KEY (iid) REFERENCES Sells
);

CREATE TABLE Employs (
    mid             INTEGER,
    riderid         INTEGER,
    fee             FLOAT,
    PRIMARY KEY (mid, riderid),
    FOREIGN KEY (mid) REFERENCES Managers,
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Assigns (
    oid             INTEGER,
    mid             INTEGER,
    riderid         INTEGER,
    acceptTime      VARCHAR(50),
    reacheTime      VARCHAR(50),
    leaveTime       VARCHAR(50),
    deliveryTime    VARCHAR(50),
    fee             FLOAT,
    PRIMARY KEY (mid, riderid, oid),
    FOREIGN KEY (oid) REFERENCES Orders,
    FOREIGN KEY (mid) REFERENCES Managers,
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE Promotions (
    pid             INTEGER,
    category        VARCHAR(20),
    value           FLOAT,
    start           VARCHAR(50),
    expire             VARCHAR(50),
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
    mSalary         INTEGER,
    PRIMARY KEY (riderid),
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE PartTimers (
    riderid         INTEGER,
    wSalary         INTEGER,
    PRIMARY KEY (riderid),
    FOREIGN KEY (riderid) REFERENCES Riders
);

CREATE TABLE MWS (
    mwsid           INTEGER,
    PRIMARY KEY (mwsid)
);

CREATE TABLE WWS (
    wwsid           INTEGER,
    PRIMARY KEY (wwsid)
);

CREATE TABLE FMaintains (
    riderid         INTEGER,
    mwsid           INTEGER,
    PRIMARY KEY (riderid, mwsid),
    FOREIGN KEY (riderid) REFERENCES FullTimers,
    FOREIGN KEY (mwsid) REFERENCES MWS
);

CREATE TABLE PMaintains (
    riderid         INTEGER,
    wwsid           INTEGER,
    totalHour       INTEGER,
    PRIMARY KEY (riderid, wwsid),
    FOREIGN KEY (riderid) REFERENCES PartTimers,
    FOREIGN KEY (wwsid) REFERENCES WWS
);

CREATE TABLE MonthConsists (
    mwsid           INTEGER,
    wwsid           INTEGER,
    PRIMARY KEY (mwsid, wwsid),
    FOREIGN KEY (mwsid) REFERENCES MWS,
    FOREIGN KEY (wwsid) REFERENCES WWS
);

CREATE TABLE Shifts (
    sid             INTEGER,
    day             VARCHAR(10),
    startTime       INTEGER,
    endTime         INTEGER,
    PRIMARY KEY (sid)
);

CREATE TABLE WeekContains (
    wwsid           INTEGER,
    sid             INTEGER,
    PRIMARY KEY (wwsid, sid),
    FOREIGN KEY (wwsid) REFERENCES WWS,
    FOREIGN KEY (sid) REFERENCES Shifts
);