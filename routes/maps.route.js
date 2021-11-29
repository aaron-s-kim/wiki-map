const express = require("express");
const router = express.Router();

const userDataHelper = require("../db-helper/user.helper");
const mapDataHelper = require("../db-helper/map.helper");

module.exports = (db) => {
  const { getUserWithUserId } = userDataHelper(db);
  const { getAllPublicMaps } = mapDataHelper(db);

  //@@ PRIVATE /maps
  // view maps page
  router.get("/", (req, res) => {
    getUserWithUserId(req.session.userId).then((user) => {
      res.render("maps", { user: user });
    });
  });

  //@@ PRIVATE /maps
  // view create map page
  router.get("/new", (req, res) => {
    getUserWithUserId(req.session.userId).then((user) => {
      res.render("create_map", { user: user });
    });
  });

  //@@ PUBLIC /maps
  //get all public maps including user's maps if authenticated
  router.get("/public-maps", (req, res) => {
    getAllPublicMaps(req.session.userId).then((data) => res.json(data));
  });

  // //@@ public route api/maps
  // //get all maps
  // router.get("/", (req, res) => {
  //   getAllMaps(db).then((data) => res.json(data));
  // });

  // //@@ public route api/maps
  // //get a registered user's maps with user ID
  // router.get("/:userId", (req, res) => {
  //   getUserMaps(req.session.userId, db).then((data) => res.json(data));
  // });

  // //@@ public route api/maps
  // //get a map with map ID
  // router.get("/:mapId", (req, res) => {
  //   getSingleMap(req.session.mapId, db).then((data) => res.json(data));
  // });

  // //@@ private route api/maps
  // //auth user creates a map
  // router.post("/new-map", (req, res) => {
  //   createMap(req.body, db).then((data) => res.json(data));
  // });

  // //@@ private route api/maps
  // //auth user deletes a map with map ID
  // router.delete("/:mapId", (req, res) => {
  //   deleteMap(req.body.mapId, db).then((data) => res.json(data));
  // });

  return router;
};
