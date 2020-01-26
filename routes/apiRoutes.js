const router = require("express").Router;
const noteFunctions = require("../noteFunctions");

router.get("/notes", function(req, res) {
    noteFunctions.getNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post("/notes", function(req, res) {
    noteFunctions.addNote(req.body).then(note => res.json(note)).catch(err => res.status(500).json(err));
});

router.delete("/note/:id", function(req, res) {
    noteFunctions.deleteNote(req.params.id).then(() => res.json({ok: true})).catch(err => res.status(500).json(err));
});

module.exports = router;