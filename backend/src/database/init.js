const { sequelize } = require('../models');

async function initDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync the database (create tables)
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log('Database tables created successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = initDatabase;