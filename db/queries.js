const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(message) {
  await pool.query(
    "INSERT INTO messages(text, username, added) VALUES($1, $2, NOW())",
    [message.text, message.username],
  );
}

async function deleteAllMessages() {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteAllMessages,
};
