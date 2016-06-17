# Twitter Search Streams using React and Redux

This app is built to better explore React, Redux and the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)

# Twitter Search Streams

You can add any number of twitter search streams. I want to evolve this project as a general library to work with a stream of data that is

-  paginated
-  filterable
-  searchable


# Getting Started

`npm install`

## Talking to Twitter API with authentication

A koa middleware is implemented in `./server/main.js` which listens for `/api/search/:query`, then uses [Twit](https://github.com/ttezel/twit) and twitter authentication keys and secret to talk to the Twitter search API.

We need to create an twitter app, so we get credentials to access the Twitter search API.

Head to [apps.twitter.com](apps.twitter.com) and create a new app. Head to the *Keys and Access Tokens* tab and get

-  Consumer Key
-  API key
-  Access Token
-  Access Token Secret


Create a file `.twitterAuth.json` in the root. Fill it with

{
  "consumer_key": "...",
  "consumer_secret": "...",
  "access_token": "...",
  "access_token_secret": "..."
}

Our server will read the authentication tokens and details from here and make calls to Twitter.


Now, `npm start`. Make sure your `NODE_ENV-development`
