const util = require("util");
const fs = require("fs");
const readFileAsynch = util.promisify(fs.readFile);
const writeFileAsynch = util.promisify(fs.writeFile);

class noteFunctions {
    constructor(){
        this.id = 0;
    }
    read() {
        return readFileAsynch("db.json", "utf8")
    }
    write(note) {
        return writeFileAsynch("db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes))
            } catch(err) {
                parseNotes = [];
            }
            return parseNotes;
        })
    }
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw err;
        }

        const newNote = {title, text, id:++this.id} 

        return this.getNotes().then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote)
    }

    deleteNote(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new noteFunctions;