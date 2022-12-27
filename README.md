# ServINFO701

## Run

```console
> npm i
> node app.js
```
## BDD

```mysql
CREATE DATABASE info701;
USE info701;

CREATE TABLE user (
  nom varchar(45) NOT NULL,
  top_score int unsigned DEFAULT 0,
  dernier_score int unsigned DEFAULT 0,
  PRIMARY KEY (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE USER 'mobile'@'localhost' IDENTIFIED WITH mysql_native_password BY 'info701' ; 
GRANT DELETE, INSERT, UPDATE, SELECT ON * TO 'mobile'@'localhost';
```
