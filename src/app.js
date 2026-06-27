const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes')
const memberRoutes = require('./routes/memberRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

app.use(errorMiddleware);

module.exports = app;