## Description
My task was to create a simple streamer spotlight application. In this application, users can add their favorite streamers along with some relevant details. Other users can then upvote or downvote these streamers. Each user's submission and the current number of upvotes/downvotes should be stored on a backend and updated/displayed on the frontend.

### Frontend:

#### Page 1:

Streamer Submission Form: This form should contain fields for the streamer's name, streaming platform dropdown (Twitch/YouTube/TikTok/Kick/Rumble) and their description.

Streamer List: This should display a list of all streamers that have been submitted, along with their number of upvotes/downvotes. This list should update in real-time as new streamers are added and upvotes are cast.

#### Page 1:

Streamer record: This is a page with details of a single streamer record - name, description, platform, and image - this image should just be a static image.

### Backend:

POST /streamers: An endpoint to receive new streamer submissions from the frontend and store them in a database.

GET /streamers: An endpoint to return all the stored streamer submissions in response to a request from the frontend.

GET /streamers/[streamerId]: An endpoint to return data about a specific streamer.

PUT /streamers/[streamerId]/vote: An endpoint to receive an upvote for a specific streamer and update their current upvote/downvote count.


## Installation

```bash
$ git clone ...

# To install dependencies use
$ bash setup.sh
```

## Running the app

```bash
# Starting from project root 

# Backend
$ cd service && npm run start:dev
# To create 10 mock streamers use
$ npm run seed
# To clear database use
$ npm run clear-data

# Frontend
$ cd client && npm run start
```

## Test
```bash
# Backend
$ cd service && npm run test

# Frontend
# Only manual test helper provided.
# Change Id in input at the top od the page and click 'reload' to interact with the page as different user.
```

Testing /streamer conrtoller. E2E tests will have in this case similiar scenarios, as this controller is top level logic layer.

In production environment I would also:
- test /user controller
- test AuthGuard
- prepare E2E tests
- test all frontend interactions and components




