const fs = require('fs');
const noteData = require('../data/noteData');
const data = fs.readFileSync('./db/db.json', 'utf8');
const notes = JSON.parse(data);


for (i = 0; i < notes.length; i++) {
  notes[i].id = '' + i;
}

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
      res.json(noteData);
  });

  app.post('/api/notes', (req, res) => {
      noteData.push(req.body);
      req.body.id = notes.length++;
      res.json(true);
  });

  app.delete('/api/notes/:id', (req, res) => {
      let note = noteData.find(({id}) => id === JSON.parse(req.params.id));

      noteData.splice(noteData.indexOf(note), 1);

      res.end();
  });
};
