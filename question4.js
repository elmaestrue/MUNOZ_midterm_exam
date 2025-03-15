const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up Sequelize connection to MySQL
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging for cleaner output
});

// Define the User model corresponding to the "users" table
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
}, {
  tableName: 'users', // Explicitly define table name
  timestamps: false,  // Disable createdAt and updatedAt fields
});

// Function to initialize database connection and start the server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL successfully.');

    // Define the /users route to fetch and return all users
    app.get('/users', async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Error retrieving users' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

startServer();
