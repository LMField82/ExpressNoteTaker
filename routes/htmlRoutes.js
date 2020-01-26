const path = require("path");
const router1 = require("express").Router();

router1.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../notes.html"));
})

router1.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
})

module.exports = router1;