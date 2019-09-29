const db = require("../../db/db");

//player rankings by game type
const getSpecificUserDB = user_num => {
  const queryString = `select * from users where id = $1`;
  return db
    .query({
      text: queryString,
      values: [user_num]
    })
    .then(res => res.rows[0]);
};

module.exports = {
  getSpecificUserDB
};
