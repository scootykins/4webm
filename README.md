# 4webm

Load and watch webms in a 4chan thread. Ideal for boards like /wsg/.

Got a cool music thread and just want to listen to all the videos in the background? Now you can.

Live [here!](http://www.4webm.org)

Also, for any arbitrary 4chan thread URL, eg. http://boards.4chan.org/wsg/thread/2036111, you can load the thread by
just replacing "4chan" with "4webm" (ie. http://boards.4webm.org/wsg/thread/2036111).


## Running locally

Because the 4chan API has a limit of one request per second, [which 4webm respects](https://github.com/ScottyFillups/4webm/blob/master/routes/enqueue.js), there could hypothetically be some lag on the live site (since the limit applies to everyone, collectively).

A solution is to run 4webm locally, to avoid sharing access to the API. You'll need to install `node`, `npm`, and `git` first.

```bash
$ git clone https://github.com/ScottyFillups/4webm.git
$ npm install
$ npm start
```

Once you do that, you should be able to access the application at `http://localhost:8080`


## Disclaimer

4webm and the creator are in no way associated with 4chan.org. The software is provided as is, and is used at your own risk.
