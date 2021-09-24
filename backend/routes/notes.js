const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Fetch User using GET "/api/auth/fetchallnotes" 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

// Add new Note using "/api/auth/addnote" 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title of min 3').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})
// Update a existing note using POST
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Find the note to be updated
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") };
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})

// DELETE AN EXISTING NOTE 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Verify the user for deletion
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") };
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndDelete(req.params.id,)
        res.json({ "Success":"Note is deleted",note });
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})
module.exports = router