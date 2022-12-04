import express from "express"
import FormData from "form-data";
import axios from "axios";
const app = express()

const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.CLIENT_SECRET

if(!CLIENT_SECRET) {
  throw new Error("SECRET NOT PROVIDED!")
}

app.get('/v1/after-login', async (req,res) => {
  const code = req.query.code
  if(!code) {
    res.status(400).send("code query is not contain in your URL.")
    return
  }

  const formData = new FormData()
  formData.append("client_id", CLIENT_ID)
  formData.append("client_secret", CLIENT_SECRET)
  formData.append("redirect_uri", REDIRECT_URI)
  formData.append("grant_type", "authorization_code")
  formData.append("scope", "identify")
  formData.append("code", code)

  const {data} = await axios.post("https://discordapp.com/api/oauth2/token", formData)
  res.send(data)
})

app.post("/v1/refresh", async (req, res) => {
  const refresh_token = req.query.refresh
  if(!refresh_token) {
    res.status(400).send("refresh token is not include your url.")
    return
  }

  const form = new FormData()
  form.append("refresh_token", refresh_token)
  form.append("client_id", CLIENT_ID)
  form.append("client_secret", CLIENT_SECRET)
  form.append("grant_type", "refresh_token")

  const {data} = await axios.post("https://discordapp.com/api/oauth2/token", formData)
  res.send(data)
})

app.listen(3000)
