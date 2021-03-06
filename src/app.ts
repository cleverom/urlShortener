import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import { graphqlHTTP } from 'express-graphql';
const dotenv = require('dotenv');
import connectDB from './config/db';
import schema from './models/url-schema';

import indexRouter from './routes/index';

dotenv.config();
connectDB();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
