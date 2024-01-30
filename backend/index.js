const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRouter = require('./src/routes/admin');
const userRouter = require('./src/routes/user');
require('dotenv').config();

const app = express();
const PORT = process.env.HOST || 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

app.use(cors());
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/user', userRouter)

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/sac`, { dbName: 'sac' });

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})