import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI);
const noteSchema = new mongoose.Schema({
  noteTitle: String,
  noteContent: String,
});

const Note = mongoose.model("Note", noteSchema);

//
app.get("/api/getAll", (req, res) => {
  Note.find({}).then((result) => {
    if (result) {
      res.status(200).send(result);// sending data to frontend
    } else {
      console.log(err);
    }
  });
});
app.post("/api/addNew", (req, res) => {
  const { title, content } = req.body;

  const note = new Note({
    noteTitle: title,
    noteContent: content,
  });
  note
    .save()
    .then((result) => {
      if (result) {
        Note.find({}).then((note_array) => {
          if (note_array) {
            res.status(200).send(note_array); // sending data to frontend
          } else {
            console.log(err);
          }
        });
      }
    })
    .catch((err) => console.log(err));
});
app.post("/api/delete", (req, res) => {
  const note_id = req.body.id;
  Note.deleteOne({ _id: note_id }).then((result) => {
    if (result) {
      Note.find({}).then((note_array) => {
        if (note_array) {
          res.status(200).send(note_array); // sending data to frontend
        } else {
          console.log(err);
        }
      });
    }
  });
});

app.listen(3001, () => {
  console.log("server started at port 3001");
});
