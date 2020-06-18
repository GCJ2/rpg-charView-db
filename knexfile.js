// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./data/gear.db3"
    },
    useNullAsDefault: true  // Unique to SQLite
  },
};
