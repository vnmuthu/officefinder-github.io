require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Server is Running...");
});

router.post('/', (request, response) => {
    const USER = {
      username: 'jamie',
      password: 'qwerty@123'
    }
  
    const { username, password } = request.body;
  
    if (username === USER.username && password === USER.password) {
      const dbUser = {
        id: 1,
        name: 'Jamie Anderson',
        username: 'jamie',
        password: 'jamie',
        homeLocation: 'Paris'
      }
      const token = jwt.sign(dbUser, 'MY_SECRET_KEY');
      response.json({
        token,
        dbUser
      });
    } else {
      response.status(403);
      response. json({
        message: 'Invalid Login Credentials!'
      })
    }
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);
app.use('/', (request, response) => response.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
