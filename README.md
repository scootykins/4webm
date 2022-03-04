<h1 align="center">:sparkles::star2:4webm:star2::sparkles:</h1>

<p align="center">
  <img style="margin: 0 auto;" alt="lolicatgirls.swf" src="http://i0.kym-cdn.com/entries/icons/medium/000/003/924/fdba34b81ab2b8396591f12a48a657cb.gif" /><br /><br />
  <em>33. Lurk more — it's never enough.</em> :four_leaf_clover:
</p><br />

<p align="center">Tired of digging through threads for videos?</p>

<p align="center">Don't get me wrong, reading through the posts can be fun...</p>

<p align="center">But sometimes, you just wanna listen to a nice YGYL thread while you work on other stuff, 'ya know?</p><br /><br />

<p align="center">Well, now you can :wink:</p>
<p align="center"><a href="https://www.4webm.org">https://www.4webm.org</a></p><br /><br />

<p align="center"><b><a href="4webm.org">4webm</a> is a web application that loads all webms from a 4chan thread into a playlist.</b></p>

Given any arbitrary 4chan thread URL, you can load it by replacing "4chan" with "4webm". For example, https://boards.4webm.org/wsg/thread/2036111

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

## Running inside a Docker container

It is also is possible to install 4webm inside a Docker container.

### Build an image

First let's create a docker image:

```bash
# Clone this repo
git clone https://github.com/scootykins/4webm.git 

# Enter the repo folder
cd 4webm

# Create an image (replace <USER> with your local user name)
docker build . -t <USER>/node-4webm
```
## Run 4webm container

Now is possible to start a 4webm container:

```bash
# Map a local port (49161) to the container port (8080)
# and start a new container in detached mode.
docker run -p 49161:8080 --rm -d <USER>/node-4webm
```

To use the 4web app just go to any browser and write `http://localhost:49161`.

The container will be deleted by the command `docker container stop <CONTAINER ID (do 'docker ps' to get it.) >` or by turning off your computer. Otherwise the container will be running as a backgroud job.

## Disclaimer

4webm and the creator are in no way associated with 4chan.org. The software is provided as is, and is used at your own risk.
