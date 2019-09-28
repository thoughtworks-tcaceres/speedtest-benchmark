DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  record_id INTEGER NOT NULL REFERENCES records(id) ON DELETE CASCADE,
  -- is_active boolean DEFAULT TRUE,
  win boolean default false
);



