# scredscore

A simple tweet scraper for tweets containing `#dailyQuarry`.
It scrapes daily scores for the game [QuarriesOfScred](www.quarriesofscred.com)
It parses name, score, time etc and then exports a jsonfile.
Included is also a default html template to display the scores.

Disclaimer:
Scredscore is NOT affiliated with, endorsed, or sponsored by the creator of Quarries of Scred.


Dependecies:

    Mongo as database.
    Node (At least 4.0.0 as required by mongoose 4.2.3).

    "async": "^1.5.0",
    "moment": "^2.10.6",
    "mongoose": "^4.2.3", 
    "twit": "^2.1.1"
    
(Run `npm install` to install.)

There are 4 files of concern:

### scredscore.js
The main program, listens to Twitters streaming API, and saves incoming tweets to a database.
It should be running at all times. Personally I use [PM2](https://github.com/Unitech/pm2)
    
### config.js
For now the only configuration is your twitter keys. 
(You need to create an app at apps.twitter.com and paste your keys here.)

### model-score.js
The mongoose model for how the scores will be stored in the database.

### generate-json.js
I run this file using a cronjob every few minutes. 
It looks for unprocessed scores and process them.
Then it groups and sorts scores and exports a `scores.json` in the html-folder.

1) Run scredscore `pm2 start scredscore`

Point your webserver to the `html` folder and you should be all set.
