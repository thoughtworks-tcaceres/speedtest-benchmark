const db = require("../../db/db");

//player rankings by game type
const getAllUsersDB = () => {
  const queryString = `select * from users order by email`;
  return db
    .query({
      text: queryString,
      values: []
      // name: "get_player_rankings_game_type"
    })
    .then(res => res.rows);
};

module.exports = {
  getAllUsersDB
};
