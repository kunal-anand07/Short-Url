const express = require("express");
const app = express();
const PORT = 8001;

const {connectToMongoDb} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRoute");
// middlewear
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const path = require("path");
app.use("/url", urlRoute);
app.use("/",staticRoute);

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongoDb connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



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