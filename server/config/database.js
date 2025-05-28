import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "bank",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promisify for easier async/await usage
export const dbPromise = db.promise();
export default db;
