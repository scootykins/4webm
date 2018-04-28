<h1 align="center">:sparkles::star2:4webm:star2::sparkles:</h1>

<p align="center">
  <img style="margin: 0 auto;" alt="lolicatgirls.swf" src="http://i0.kym-cdn.com/entries/icons/medium/000/003/924/fdba34b81ab2b8396591f12a48a657cb.gif" /><br /><br />
  <em>33. Lurk more — it's never enough.</em> :four_leaf_clover:
</p><br />

<p align="center">Tired of digging through threads for videos?</p>

<p align="center">Don't get me wrong, reading through the posts can be fun...</p>

<p align="center">But sometimes, you just wanna listen to a nice YGYL thread while you work on other stuff, 'ya know?</p><br /><br />

<p align="center">Well, now you can :wink:</p><br /><br />

<p align="center"><b><a href="4webm.org">4webm</a> is a web application that loads all webms from a 4chan thread into a playlist.</b></p>

Given any arbitrary 4chan thread URL, you can load it by replacing "4chan" with "4webm", eg. https://boards.4chan.org/wsg/thread/2036111 -> https://boards.4webm.org/wsg/thread/2036111

<br />

## Running locally

Because the 4chan API has a limit of one request per second, [which 4webm respects](https://github.com/ScottyFillups/4webm/blob/master/routes/enqueue.js), there could hypothetically be some lag on the live site (since the limit applies to everyone, collectively).

A solution is to run 4webm locally, to avoid sharing access to the API. You'll need to install `node`, `npm`, and `git` first.

```bash
$ git clone https://github.com/ScottyFillups/4webm.git
$ npm install
$ npm run build
$ npm run start
```

Once you do that, you should be able to access the application at `http://localhost:8080`


## Disclaimer

4webm and the creator are in no way associated with 4chan.org. The software is provided as is, and is used at your own risk.
