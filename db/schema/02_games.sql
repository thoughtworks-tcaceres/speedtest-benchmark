DROP TABLE IF EXISTS games CASCADE;

CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(31) NOT NULL,
  description text NOT NULL,
  maximum_users smallint NOT NULL,
  minimum_users smallint NOT NULL
);



