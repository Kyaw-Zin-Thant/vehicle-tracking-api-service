const env = process.env.NODE_ENV || "local";

const envConfig = {
  local: {
    port: 8080,
    db: {
      username: "root",
      password: null,
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
  },
  development: {
    port: 7001,
    db: {
      username: "root",
      password: null,
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
  },
  production: {
    port: 7001,
    db: {
      username: "root",
      password: null,
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
  },
};

exports.config = {
  ...envConfig[env],
};
