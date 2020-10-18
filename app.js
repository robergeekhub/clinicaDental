const express = require('express');
const app = express();
const cors = require('./middleware/cors');

const usersRouter = require('./routers/userRouter');
const appointmentsRouter = require('./routers/appointmentRouter');

//Middleware
app.use(express.json()); 
app.use(cors);

//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();

app.use('/users',usersRouter);
app.use('/appointments', appointmentsRouter);

app.listen(3000, () => console.log('Server running.'))


