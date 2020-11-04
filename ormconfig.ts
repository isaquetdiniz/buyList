import "dotenv/config";

export = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DATABASE_DB_TEST
      : process.env.DATABASE_DB,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
