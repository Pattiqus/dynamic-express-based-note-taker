// # Import: Required node modules
const fs = require("fs");
const router = require('express').Router;
import { randomUUID } from 'crypto';
import { networkInterfaces } from 'os';
import path from 'path';

// # GET: Route for /notes
router.get("/notes", (req, res) => {
    console.info(`New ${req.method} request received for /notes`)
    // # Read: notes file
    fs.readFile("." + path.sep +"db" + path.sep + "db.json", (err, data) => {
      err ? console.info(err) : res.json(JSON.parse(data));
    })

});

// # POST: Route for /notes
router.post("/notes", (req, res) => {
    console.info(`New ${req.method} request received for /notes`)
    // # Request: Body data
    const { title, text } = req.body;
    // # If: required values are input
    if (title && text) {
        // # Obeject: to be saved to notes
        const newNote = {
            title,
            text,
            id: randomUUID(),
        }
    

        // # Read: note file
        fs.readFile(("." + path.sep + "db" + path.sep + "db.json"), "utf-8", (err, data) => {
            if (err) {
                console.info(err);
            } else {
                const parsedNotes = JSON.parse(data);
                // # Push: new note to db
                parsedNotes.push(newNote);
                // # Write: New note to file
                fs.writeFile("." + path.sep + "db" + path.sep + "db.json", JSON.stringify(parsedNotes), (err) => 
                    err ? console.error(err) : console.log("Success")
                )
            }
    
        })

        // 
}
