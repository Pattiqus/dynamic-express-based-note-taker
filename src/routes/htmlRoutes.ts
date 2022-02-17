// Node Modules
const path = require('path')
const router = require('express').Router();

// # GET: Route for notes.html
router.get("/notes", (req, res) => {
    console.info(`New ${req.method} received for /notes`)
    res.sendFile(path.join(__dirname, '..' + path.sep + '..' + path.sep + 'public' + path.sep + 'notes.html')) 
});

// # GET (Wildcard): Routes back to homepage when request does not exist
router.get("*",(req, res) => {
    console.info(`New ${req.method} request received for wildcard`)
    res.sendFile(path.join(__dirname, '..' + path.sep + '..' + path.sep + 'public' + path.sep + 'index.html'))
});