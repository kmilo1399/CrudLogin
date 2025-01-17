export const database = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "example",
  database: process.env.DB_NAME || "smartphone",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
