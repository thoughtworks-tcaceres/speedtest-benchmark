DROP TABLE IF EXISTS records CASCADE;

CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  game_id INTEGER  NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  -- turn_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- is_active boolean DEFAULT TRUE,
  start_time timestamp default CURRENT_TIMESTAMP,
  end_time timestamp
);



