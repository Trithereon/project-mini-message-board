#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  added TIMESTAMPTZ
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hello World!', 'Bryan', NOW()),
  ('I am so wise and beautiful', 'Odin', NOW()),
  ('Snozzberries?! Who ever heard of a snozzberry?', 'Damon', NOW()),
  ('Gooses. Geeses. I want my goose to lay gold eggs for Easter', 'Superman', NOW()),
  ('Bella, no!', 'Jacob', NOW());
`;

async function main() {
  console.log("seeding database...");
  const client = new Client({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  // const { rows } = await client.query("SELECT * FROM messages;");
  // console.log(rows);
  await client.end();
  console.log("seeding complete.");
}

main();
