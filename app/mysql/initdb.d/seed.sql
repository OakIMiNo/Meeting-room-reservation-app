show databases;
use mydb;

# migrateしてテーブルができていればここはしなくてOK
-- CREATE TABLE users (
--         id INTEGER NOT NULL AUTO_INCREMENT,
--         name VARCHAR(254),
--         email VARCHAR(254) NOT NULL,
--         hashed_password VARCHAR(72) NOT NULL,
--         disabled BOOL NOT NULL,
--         admin BOOL NOT NULL,
--         PRIMARY KEY (id),
--         UNIQUE (email),
--         UNIQUE (hashed_password)
-- );

-- CREATE TABLE areas (
--         id INTEGER NOT NULL AUTO_INCREMENT,
--         name VARCHAR(100) NOT NULL,
--         disabled BOOL NOT NULL,
--         PRIMARY KEY (id),
--         UNIQUE (name)
-- );

-- CREATE TABLE rooms (
--         id INTEGER NOT NULL AUTO_INCREMENT,
--         name VARCHAR(100) NOT NULL,
--         capacity INTEGER NOT NULL,
--         img_url VARCHAR(2048) NOT NULL,
--         address VARCHAR(300) NOT NULL,
--         description VARCHAR(1000) NOT NULL,
--         disabled BOOL NOT NULL,
--         area_id INTEGER,
--         PRIMARY KEY (id),
--         FOREIGN KEY(area_id) REFERENCES areas (id)
-- );


select*from areas;
select*from rooms;
select*from users;

## データ挿入　areas
insert areas(name,disabled)
values
  ('港区',False),
  ('千代田区',False),
  ('中央区',False);

insert areas(name,disabled)
values
  ('新宿区',False),
  ('渋谷区',False);

## データ挿入　rooms
insert rooms(name,capacity,img_url,address,description,disabled,area_id)
values
  ('Aビル貸会議室1',5,'https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/room_1.jpg','東京都港区三田○○','駅徒歩1分、○○完備、△△',False,1),
  ('Bビル貸会議室2',10,'https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/0_rooms_example.jpg','東京都千代田区丸の内○○','駅徒歩2分、○○完備、△△',False,2),
  ('Cビル貸会議室3',15,'https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/room_4.jpg','東京都中央区','駅徒歩2分、○○完備、△△',False,3),
  ('Dビル貸会議室4',10,'https://bc01w7-app.s3.ap-northeast-1.amazonaws.com/room_2.jpg','東京都新宿区西新宿','駅徒歩2分、○○完備 △△',False,4);

insert users(name,email,hashed_password,disabled,admin)
values
 # ('postman','postman@example.com','$2b$12$JaSNLvdfKaIw/WY2dvQ9p.3wKrGNfkkx7AWD7qCVSGtjtEJhiW9.2',0,0),
  ('test','test@example.com','$2b$12$04VEn.EpjDqEYT1L84EBc.w../E/TK7l0rpPCdOXzdYOxhl5SoUyW',0,0),
 # ('admin','admin@example.com','$2b$12$/19/0mt3m6yG6AKywpA4WuU6N0uwONnjyQY7TLAXlLK//FFFfVX4W',0,1),
  ('user','user@example.com','$2b$12$uMCbyLvfxK1DOn1kQfU8UeCnHYLmCsO/u.5EOQOFxUwQTqA8YRyC6',0,0);


  
  
