# Tweets Deleter 🚮

This script is programmed to delete your personal tweets from the oldest to the newest.

First you'll need a Twitter developer account and authentication tokens. Check how to get yours in the [official documentation](https://developer.twitter.com/en/docs/twitter-api/getting-started/guide). Then you'll need to [download your Twitter data](https://help.twitter.com/pt/managing-your-account/how-to-download-your-twitter-archive), which comes with every tweet id that's needed for deletion.

## How to use it

- After downloading your Twitter data, copy the file `tweet.js` located inside the `data` folder from the `.zip` you downloaded and paste it inside this folder.
- Set your API keys and maximum number of requests into `.env.example` and rename the file to `.env`. Remember not to set a value greater than your rate limit in MAX_REQUESTS. According to [Twitter API docs](https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits) the rate limit is 300 requests every 3 hours for standard accounts.
- Run `npm install` to install the required dependencies.
- Run `npm start` to delete your tweets.

This script creates a `tweets.json` file for controlling which tweets are left. Once all your tweets are deleted, this file will get empty. 

The number of tweets deleted each time you run this script is defined by the MAX_REQUESTS constant located in your `.env` file. It's very important not to exceed your rate limit, so you should wait for at least 3 hours before running this script again.