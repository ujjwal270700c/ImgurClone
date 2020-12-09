const cloudinary = require("cloudinary");
const express = require("express");
const router = express.Router();
const config = require("config");
const multipart = require("connect-multiparty");
const Datastore = require("nedb");
const Pusher = require("pusher");

const db = new Datastore();
//setup multipart
const multipartMiddleware = multipart();
// Pusher configuration
const pusher = new Pusher({
  appId: config.get('PUSHER_APP_ID'),
  key: config.get('PUSHER_APP_KEY'),
  secret: config.get('PUSHER_APP_SECRET'),
  cluster: config.get('PUSHER_APP_CLUSTER'),
  encrypted: true,
});
// Cloudinary configuration
cloudinary.config({
  cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
  api_key: config.get('CLOUDINARY_API_KEY'),
  api_secret:"9gNCEgVmqVxeoMyE3o_kh_x5igY"
});
// Get images from database
router.get("/", (req, res) => {
  console.log("hdhdhd");
  db.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
});
// Upload image
router.post("/", multipartMiddleware, (req, res) => {
  cloudinary.v2.uploader.upload(
    req.files.image.path,
    {},
    function (error, result) {
      if (error) {
        return res.status(500).send(error);
      }
      // Save record
      db.insert(Object.assign({}, result, req.body), (err, newDoc) => {
        if (err) {
          return res.status(500).send(err);
        }
        // Emit realtime event
        pusher.trigger("gallery", "upload", {
          image: newDoc,
        });
        res.status(200).json(newDoc);
      });
    }
  );
});

module.exports = router;
