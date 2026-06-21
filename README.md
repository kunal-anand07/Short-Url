# Short URL

A URL shortening service built with Node.js, Express.js, and MongoDB that generates short links and tracks click analytics.

## Features

* Generate short URLs from long URLs
* Redirect users using a unique short ID
* Track visit history
* Count total clicks for each shortened URL
* View analytics for a URL

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* NanoID

## API Endpoints

### Create Short URL

`POST /url`

### Redirect to Original URL

`GET /:shortId`

### Get Analytics

`GET /url/analytics/:shortId`

Returns:

* Total clicks
* Visit history with timestamps

## Installation

```bash
npm install
npm start
```

## Author

Kunal Anand
