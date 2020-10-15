const express = require('express');
const app = express();
const auth = require('./middleware/auth');

app.use(express.json()); ////Middleware

app.listen(3000, () => console.log('Server running.'))


