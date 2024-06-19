const path = require("path");

require("dotenv").config();

const {
  NODE_ENV = 'development',
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;

const DATABASE_URL = NODE_ENV === 'production' 
  ? PRODUCTION_DATABASE_URL
  : DEVELOPMENT_DATABASE_URL;

console.log("Connecting to database at:", DATABASE_URL);

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};

