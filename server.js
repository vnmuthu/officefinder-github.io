require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Server is Running...");
})

app.post("/login", (request, response) => {
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
    const token = jwt.sign(dbUser, "MY_SECRET_KEY");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
