import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //fetch data from backend
    axios
      .get("http://localhost:3001/api/getAll")
      .then((res) => setNotes(res.data));
  }, []);// Empty dependency array to run the effect only on mount

  function addNote(newNote) {
    if (newNote.title || newNote.content) {
      axios
        .post("http://localhost:3001/api/addNew", newNote)
        .then((res) => setNotes(res.data));
    }
  }

  function deleteNote(id) {
    axios.post("http://localhost:3001/api/delete",{ id }) //sending id to backend 
    .then(res => setNotes(res.data))
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.noteTitle}
            content={noteItem.noteContent}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
