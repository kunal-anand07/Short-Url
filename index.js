const express = require("express");
const app = express();
const PORT = 8001;
const {connectToMongoDb} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
app.use(express.json());

app.use("/url", urlRoute);

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongoDb connected"));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    },
    {
        timestamp : true,
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectedId);
});

app.listen(PORT, ()=>{console.log(`Server Started At Port ${PORT}`)});