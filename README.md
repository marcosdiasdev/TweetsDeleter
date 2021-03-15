# Tweets Deleter 🚮

This script is programmed to automatically delete your personal tweets from the oldest to the newest.

When will you want to use this? When you want to delete your old tweets but don't want to do this manually, which would take a lot of time.

First you'll need a Twitter developer account and authentication tokens. Check how to get yours in the [official documentation](https://developer.twitter.com/en/docs/twitter-api/getting-started/guide). Then you'll need to [download your Twitter data](https://help.twitter.com/pt/managing-your-account/how-to-download-your-twitter-archive), which comes with every tweet id that's needed for deletion.

## How to use it

- After downloading your Twitter data, copy the file `tweet.js` located inside the `data` folder from the `.zip` you downloaded and paste it inside this folder.
- Set your API keys and maximum number of requests into `.env.example` and rename the file to `.env`.
- Run `npm install` to install the required dependencies.
- Run `npm start` to delete your tweets.

This script creates a `tweets.json` file for controlling which tweets are left. Once all your tweets are deleted, this file will get empty. 

The number of tweets deleted each time you run this script is defined by the MAX_REQUESTS constant located in your `.env` file. [Twitter API docs](https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits) doesn't mention a rate limit for `statuses/destroy`, which is the route we use for deletion, however, I think it's better not to abuse it. In my tests I've deleted about 2000 tweets in less than 2 minutes.