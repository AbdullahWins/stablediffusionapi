const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const axios = require("axios");
const { getToken, Client } = require("@threadsjs/threads.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// openai imports
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const oauth = OAuth({
//   consumer: {
//     key: process.env.TWITTER_API_KEY,
//     secret: process.env.TWITTER_API_SECRET,
//   },
//   signature_method: "HMAC-SHA1",
//   hash_function: (baseString, key) => {
//     return crypto.createHmac("sha1", key).update(baseString).digest("base64");
//   },
// });

// app.get("/api/twitter/login", (req, res) => {
//   const request_data = {
//     url: "https://api.twitter.com/oauth/request_token",
//     method: "POST",
//     data: { oauth_callback: "http://localhost:5000/callback" },
//   };

//   axios
//     .request({
//       url: request_data.url,
//       method: request_data.method,
//       headers: oauth.toHeader(oauth.authorize(request_data)),
//       data: request_data.data,
//     })
//     .then((response) => {
//       const { oauth_token, oauth_token_secret } = oauth.deParam(response.data);
//       const redirectUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
//       res.redirect(redirectUrl); // Redirect the client to Twitter authentication
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       res.status(500).send("Error occurred during Twitter login");
//     });
// });

// app.get("/threads/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const token = await getToken(process.env.un, process.env.ps);
//     const client = new Client({ token });

//     const user = await client.users.fetch("25025320");
//     console.log(user);
//     res.json(user);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Error occurred while fetching the user");
//   }
// });

// app.get("/callback", (req, res) => {
//   const { oauth_token, oauth_verifier } = req.query;

//   const request_data = {
//     url: "https://api.twitter.com/oauth/access_token",
//     method: "POST",
//     data: { oauth_token, oauth_verifier },
//   };

//   axios
//     .request({
//       url: request_data.url,
//       method: request_data.method,
//       headers: oauth.toHeader(oauth.authorize(request_data)),
//       data: request_data.data,
//     })
//     .then((response) => {
//       const { oauth_token, oauth_token_secret } = oauth.deParam(response.data);
//       res.json({ accessToken: oauth_token });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       res.status(500).send("Error occurred during Twitter authentication");
//     });
// });

// // openai

// app.post("/openai", async (req, res) => {
//   try {
//     const data = req.body;
//     console.log(data);

//     const chatCompletion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: data.message },
//       ],
//     });

//     console.log(chatCompletion);

//     res.send(chatCompletion.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// stable

app.post("/stable", (req, res) => {
  console.log(req.body); // Log the request body to debug

  const options = {
    method: "POST",
    url: "https://stablediffusionapi.com/api/v4/dreambooth",
    headers: {
      "Content-Type": "application/json",
    },
    data: req.body,
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error occurred during the stable API request");
    });
});

// server start

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
