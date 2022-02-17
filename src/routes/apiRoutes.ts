// # Import: Required node modules
const fs = require("fs");
const router = require('express').Router;
import { randomUUID } from 'crypto';
const path = require('path')

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

        // # Return: success with new note in body
        const response = {
            status: 'success',
            body: newNote,
        }
        console.info(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error, note not posted')
    }
});

// # DELETE: Route for /notes
router.delete("/notes:id", (req, res) => {
    console.info(`New ${req.method} received for ID ${req.params.id} note`);

    let filteredNotes = [];

    // # De-structure: req.params object to new variable within
    const { id } = req.params;

    // # Read: note file
    fs.readFile("." + path.sep + "db" + path.sep + "db.json", "utf-8", (err, data) => {
        const dataParsed = JSON.parse(data);
        if (err) {
            console.info(err)
        } else {
            // # Search: notes file
            for ( let notes = 0; notes < dataParsed.length; notes++) {
                // # Check: if note ID matches user deleted note ID
                if (id === dataParsed[notes].id) {
                    // # Remove: note matching ID
                    filteredNotes = dataParsed.filter(note => {
                        return note.id != id
                    });

                    // # Write: new file with filteredNotes
                    fs.writeFile("." + path.sep + "db" + path.sep + "db.json", JSON.stringify(filteredNotes), (err) => 
                    err ? console.log(err) : console.log('Success')
                    );
                    return res.json(`Note #${id} deleted`)
                }
            }
            return res.json("Failed to find note with input ID")
        }
    })

});

module.exports = router;