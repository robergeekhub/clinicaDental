const express = require('express');
const app = express();
const cors = require('./middleware/cors');

const userRouter = require('./routers/userRouter');
const appointmentRouter = require('./routers/appointmentRouter');

//Middleware
app.use(express.json()); 
app.use(cors);

//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();



app.listen(3000, () => console.log('Server running.'))


