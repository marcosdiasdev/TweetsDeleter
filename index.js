require('dotenv').config();
const Twitter = require('twitter');
const fs = require('fs');

const maxRequests = Number(process.env.MAX_REQUESTS);

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function getTweetsFromJSONFile() {
  return JSON.parse(fs.readFileSync('tweets.json'));
}

function getTweetsFromTweetJs() {
  let rawData = fs.readFileSync('tweet.js', { encoding: 'utf8' } );
  let tweets = JSON.parse(rawData.split('window.YTD.tweet.part0 = ')[1]);
  tweets.sort((a, b) => Number(a.tweet.id) - Number(b.tweet.id));
  return tweets;
}

function createJSONFileFrom(tweets) {
  fs.writeFileSync('tweets.json', JSON.stringify(tweets));
}

function updateJSONFileWith(tweets) {
  fs.writeFileSync('tweets.json', JSON.stringify(tweets));
}

function execute() {
  let tweets = [] 

  try {
    tweets = getTweetsFromJSONFile();
  } catch(error) {
    if(error.code === 'ENOENT') {
      console.log(`JSON file not found. Will create a new JSON file from tweet.js.`);
      tweets = getTweetsFromTweetJs();
      createJSONFileFrom(tweets);
    } else {
      throw error;
    }
  }
  
  const rest = tweets.filter((tweet, i) => {
    if(i > maxRequests - 1) return true;

    let error = null;
    console.log(`${i}) Will try to delete tweet with id ${tweet.tweet.id}`);
    client.post(`statuses/destroy/${tweet.tweet.id}.json`, err => error = err);
    if(error) return true;
    
    console.log(`${i}) Deleted tweet with id ${tweet.tweet.id}`);
    return false;
  });

  console.log(`${rest.length} tweets left.`);
  updateJSONFileWith(rest);
}

execute();