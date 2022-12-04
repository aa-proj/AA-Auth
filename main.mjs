import express from "express"
import FormData from "form-data";
import axios from "axios";
import request from "request";

const app = express()

const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.CLIENT_SECRET

if (!CLIENT_SECRET) {
  throw new Error("SECRET NOT PROVIDED!")
}

app.get('/v1/after-login', async (req, res) => {
  const code = req.query.code
  if (!code) {
    res.status(400).send("code query is not contain in your URL.")
    return
  }

  const options = {
    'method': 'POST',
    'url': 'https://discordapp.com/api/oauth2/token',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'code': code,
      'redirect_uri': REDIRECT_URI,
      'client_secret': CLIENT_SECRET,
      'client_id': CLIENT_ID,
      'grant_type': 'authorization_code',
      'scope': 'identify'
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body)
    return
  });
})

app.post("/v1/refresh", async (req, res) => {
  const refresh_token = req.query.refresh
  if (!refresh_token) {
    res.status(400).send("refresh token is not include your url.")
    return
  }

  const options = {
    'method': 'POST',
    'url': 'https://discordapp.com/api/oauth2/token',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'refresh_token': refresh_token,
      'redirect_uri': REDIRECT_URI,
      'client_secret': CLIENT_SECRET,
      'client_id': CLIENT_ID,
      'grant_type': 'refresh_token',
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body)
    return
  });
  
})

app.listen(3000)
