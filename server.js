const logger = require('morgan');
const express = require('express');
const routes = require('./routes');
const db = require('./models');
const PORT = process.env.PORT || 3001;
const app = express();

// Configure middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on PORT ${PORT}`);
  });
});
