const db = require('../../db/db');

//player rankings by game type
const getPlayerRankingsByGameType = () => {
  const queryString = `select u.username as username, u.email as email, g.name as "game_name",
                      sum(case when s.win = true then 1.00 else 0.00 end) as total_wins,
                      count(*) as total_games,
                      round((sum(case when s.win = true then 1.00 else 0.00 end)/count(*))*100,2) as win_percent
                      from users u
                      join sessions s on u.id = s.user_id
                      join records r on r.id = s.record_id
                      join games g on g.id = r.game_id
                      where r.end_time IS NOT NULL
                      group by u.id, g.id
                      order by win_percent DESC`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_player_rankings_game_type'
    })
    .then((res) => res.rows);
};

//archive of games played by each player
const getArchivedGames = () => {
  const queryString = `select u.username as "username", u.email as "email" , g.name as "game_name", r.id as "game_id", case when s.win = true then 'win' else 'loss' end as "win_loss"
                        from users u
                        join sessions s on s.user_id = u.id
                        join records r on r.id = s.record_id
                        join games g on g.id = r.game_id
                        where r.end_time IS NOT NULL;`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_archived_games'
    })
    .then((res) => res.rows);
};

//select all users
const getAllUsersDB = () => {
  const queryString = `SELECT * FROM users;`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_all_users'
    })
    .then((res) => res.rows);
};

// select specific user by username
const getUserByUsernameDB = (username) => {
  const queryString = `SELECT * FROM users WHERE username = $1;`;
  const queryParams = [`${username}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'get_user_by_username'
    })
    .then((res) => res.rows[0]);
};

//select specific user
const getUserByEmailDB = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const queryParams = [`${email}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'get_user_by_email'
    })
    .then((res) => res.rows[0]);
};

//add user
const addUserDB = (username, email, password) => {
  const queryString = `INSERT INTO users (username, email, password)
                      VALUES ($1, $2, $3) RETURNING *;`;
  const queryParams = [`${username}`, `${email}`, `${password}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'add_user_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

//all game info
const getAllGameInfoDB = () => {
  const queryString = `SELECT * FROM games;`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_all_game_info'
    })
    .then((res) => res.rows);
};

//all game sessions
const getAllGameSessionsDB = () => {
  const queryString = `SELECT * FROM sessions;`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_all_game_sessions'
    })
    .then((res) => res.rows);
};

//get all game records
const getAllGameRecordsDB = () => {
  const queryString = `SELECT * FROM records;`;
  return db
    .query({
      text: queryString,
      values: [],
      name: 'get_all_game_records'
    })
    .then((res) => res.rows);
};

//get game records for specific user
const getUserGameRecordsDB = (username) => {
  const queryString = `SELECT *
    FROM records r
    JOIN sessions s ON r.id = s.record_id
    JOIN users u on s.user_id = u.id
    WHERE username = $1;`;
  return db
    .query({
      text: queryString,
      values: [`${username}`],
      name: 'get_user_game_records'
    })
    .then((res) => res.rows);
};

//insert initial record
const addRecordDB = (game_id) => {
  const queryString = `INSERT INTO records (game_id)
                      VALUES ($1) RETURNING *;`;
  const queryParams = [`${game_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'add_record_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

//insert initial session
const addSessionDB = (user_id, record_id) => {
  const queryString = `INSERT INTO sessions (user_id, record_id)
                      VALUES ($1, $2) RETURNING *;`;
  const queryParams = [`${user_id}`, `${record_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'add_session_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

//insert initial session
const addSessionFlexibleDB = (email_arr, record_id) => {
  console.log('I am here');
  const queryString = `INSERT INTO sessions (user_id, record_id)
                      SELECT id, $2
                      FROM users
                      WHERE email = ANY($1)
                      RETURNING *;`;
  const queryParams = [email_arr, `${record_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'add_session_flexible_db'
    })
    .then((res) => {
      return res.rows;
    });
};

//insert initial record
const updateRecordDB = (record_id) => {
  const queryString = `UPDATE records
                      SET end_time = CURRENT_TIMESTAMP
                      WHERE id = $1
                      RETURNING *;`;
  const queryParams = [`${record_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'update_record_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

//insert initial session
const updateSessionDB = (user_id, record_id) => {
  const queryString = `UPDATE sessions
                      SET win = true
                      WHERE user_id = $1 and record_id = $2
                      RETURNING *;`;
  const queryParams = [`${user_id}`, `${record_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'update_session_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

const updateSessionFlexibleDB = (email_arr, record_id) => {
  const queryString = `UPDATE sessions
                      SET win = true
                      WHERE record_id = $2 and user_id = ANY(SELECT id FROM users
                                                          WHERE email = ANY($1))
                      RETURNING *;`;
  const queryParams = [email_arr, `${record_id}`];
  return db
    .query({
      text: queryString,
      values: queryParams,
      name: 'update_session_flexible_db'
    })
    .then((res) => {
      return res.rows[0];
    });
};

module.exports = {
  getAllUsersDB,
  getUserByUsernameDB,
  getUserByEmailDB,
  addUserDB,
  getAllGameInfoDB,
  getAllGameSessionsDB,
  getAllGameRecordsDB,
  getUserGameRecordsDB,
  addRecordDB,
  addSessionDB,
  updateRecordDB,
  updateSessionDB,
  addSessionFlexibleDB,
  updateSessionFlexibleDB,
  getPlayerRankingsByGameType,
  getArchivedGames
};
