const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const authMembers = require('./routes/memberRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/books", authMembers);

app.use(errorMiddleware);

module.exports = app;