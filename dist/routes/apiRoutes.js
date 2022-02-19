"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// # Import: Required node modules
var fs = require("fs");
var router = require('express').Router();
var path = require('path');
var uuid = require('..' + path.sep + '..' + path.sep + 'helpers' + path.sep + 'uuid.js');
// # GET: Route for /notes
router.get("/notes", function (req, res) {
    console.info("New ".concat(req.method, " request received for /api/notes"));
    // # Read: notes file
    fs.readFile(path.join(__dirname, '../../db/db.json'), function (err, data) {
        if (err) {
            console.info(err);
        }
        else {
            res.json(JSON.parse(data));
        }
    });
});
// # POST: Route for /notes
router.post("/notes", function (req, res) {
    console.info("New ".concat(req.method, " request received for /api/notes"));
    // # Request: Body data
    var _a = req.body, title = _a.title, text = _a.text;
    // # If: required values are input
    if (title && text) {
        // # Obeject: to be saved to notes
        var newNote_1 = {
            title: title,
            text: text,
            id: uuid()
        };
        // # Read: note file
        fs.readFile(path.join(__dirname, '../../db/db.json'), "utf-8", function (err, data) {
            if (err) {
                console.info(err);
            }
            else {
                var parsedNotes = JSON.parse(data);
                // # Push: new note to db
                parsedNotes.push(newNote_1);
                // # Write: New note to file
                fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(parsedNotes), function (err) {
                    return err ? console.error(err) : console.log("Success");
                });
            }
        });
        // # Return: success with new note in body
        var response = {
            status: 'success',
            body: newNote_1,
        };
        console.info(response);
        res.status(201).json(response);
    }
    else {
        res.status(500).json('Error, note not posted');
    }
});
// # DELETE: Route for /notes
router.delete("/notes/:id", function (req, res) {
    console.info("New ".concat(req.method, " received for ID ").concat(req.params.id, " note"));
    var filteredNotes = [];
    // # De-structure: req.params object to new variable within
    var id = req.params.id;
    // # Read: note file
    fs.readFile(path.join(__dirname, '../../db/db.json'), "utf-8", function (err, data) {
        var dataParsed = JSON.parse(data);
        if (err) {
            console.info(err);
        }
        else {
            // # Search: notes file
            for (var notes = 0; notes < dataParsed.length; notes++) {
                // # Check: if note ID matches user deleted note ID
                if (id === dataParsed[notes].id) {
                    // # Remove: note matching ID
                    filteredNotes = dataParsed.filter(function (note) {
                        return note.id != id;
                    });
                    // # Write: new file with filteredNotes
                    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes), function (err) {
                        return err ? console.log(err) : console.log('Success');
                    });
                    return res.json("Note #".concat(id, " deleted"));
                }
            }
            return res.json("Failed to find note with input ID");
        }
    });
});
module.exports = router;
