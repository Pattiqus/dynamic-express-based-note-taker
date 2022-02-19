// Node Modules
var path = require('path');
var router = require('express').Router();
// # GET: Route for notes.html
router.get("/notes", function (req, res) {
    console.info("New ".concat(req.method, " received for /notes"));
    res.sendFile(path.join(__dirname, '..' + path.sep + '..' + path.sep + 'public' + path.sep + 'notes.html'));
});
// # GET (Wildcard): Routes back to homepage when request does not exist
router.get("*", function (req, res) {
    console.info("New ".concat(req.method, " request received for wildcard"));
    res.sendFile(path.join(__dirname, '..' + path.sep + '..' + path.sep + 'public' + path.sep + 'index.html'));
});
module.exports = router;
