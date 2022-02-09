load data local infile '/data/gongju/parking.csv'
into table parking
FIELDS TERMINATED BY ','
IGNORE 1 ROWS;
