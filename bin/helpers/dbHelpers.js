const db = require("../../db/db");

//player rankings by game type
const getUsersDB = user_num => {
  const queryString = `select * from users`;
  return db
    .query({
      text: queryString
    })
    .then(res => res.rows);
};

module.exports = {
  getUsersDB
};
