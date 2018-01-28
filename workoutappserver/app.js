const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const graphqlServer = require('graphql-server-express');
const graphqlTools = require('graphql-tools');
const jwt = require('jsonwebtoken');
const api = require('./routes/api');
const models = require('./models/index');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const schema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});
const SECRET = 'se@nT0l1n01sAw3s0m3V3ryC001@n#$^*()32$$$^1243288Yklsfwi^7#@!90&&$253!325edds##@$!@(#*$&KDksdlfkjwoeiKDhemdhJFS,djsw)';

const app = express();

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const result = await jwt.verify(token, SECRET);
      req.userId = result.id;
    } catch (err) {
      res.status(401).json('Invalid user');
    }
  }
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(userAuthMiddleware);
app.use(passport.initialize());
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/graphql',
  graphqlServer.graphqlExpress(req => ({
    schema: schema,
    context: {
      models,
      userId: req.userId
    }
  }))
);
app.use('/graphql',
  graphqlServer.graphiqlExpress({
    endpointURL: '/graphql'
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
