//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const dbNotes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

//set up express app
const app = express();
const PORT = process.env.PORT || 8080;

//set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public','index.html')));

app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, 'public','notes.html')));

//display all notes
app.get('/api/notes', (req, res) => res.json(dbNotes));

//display notes, or return false
app.get('/api/notes/:note', (req, res) => {
    const searched = req.params.note;
    console.log(searched);

    for (let i = 0; i < dbNotes.length; i++) {
        if (searched === dbNotes[i].routeName) {
            return res.json(dbNotes[i]);
    }
    fs.readFile('./db/db.json', JSON.parse(dbNotes), (err) =>  {
        if (err) throw err;
    });
}
});


//create new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    newNote.routeName = newNote.title.replace(/\s+/g, '');
    newNote.id = uuidv4();
    dbNotes.push(newNote);
    

    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), (err) =>  {
        if (err) throw err;
    });
    res.json(newNote);
});

// delete notes
// app.delete('/api/notes/:id', (req, res) => {
//     fs.readFile(newNote, (err) => {
//         if(err) throw err;
//         newNote = JSON.parse(data);

//     let noteData = newNote.find(({id}) => id === req.params.id)
//     newNote.splice(noteData, 1);
//     dbUpdate(dbNotes);
//     res.send(dbNotes);
// });


//start server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
