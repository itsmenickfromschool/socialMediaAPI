const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const activity = cwd.includes('socialMediaAPI')
  ? cwd.split('socialMediaAPI')[1]
  : cwd;

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });
  