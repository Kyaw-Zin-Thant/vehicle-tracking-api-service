const env = process.env.NODE_ENV || "local";

const envConfig = {
  local: {
    port: 8080,
    db: {
      username: "root",
      password: "root1996@",
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
    apikey: "5ef88f71-cbff-4074-b2ff-0f93b541e2c3",
  },
  test: {
    port: 8080,
    db: {
      username: "root",
      password: "root1996@",
      database: "vehicle_tracking_test",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
    apikey: "5ef88f71-cbff-4074-b2ff-0f93b541e2c3",
  },
  development: {
    port: 7001,
    db: {
      username: "root",
      password: "root1996@",
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
    apikey: "5ef88f71-cbff-4074-b2ff-0f93b541e2c3",
  },
  production: {
    port: 7001,
    db: {
      username: "root",
      password: "root1996@",
      database: "vehicle_tracking",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    },
    apikey: "5ef88f71-cbff-4074-b2ff-0f93b541e2c3",
  },
};

exports.config = {
  ...envConfig[env],
};
