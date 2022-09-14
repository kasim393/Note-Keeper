import React, { useState } from "react";
import { addNotes } from "../../utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import "./notes.css";
const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [empty, setEmpty] = useState(false);

  const BgColors = [
    "#FFF6C8",
    "#E0FFC8",
    "#C8FFF2",
    "#C8F2FF",
    "#C8DBFF",
    "#E0C8FF",
    "#FFC8C8",
    "#FFE6C8",
  ];

  const submitNote = (e) => {
    e.preventDefault();

    try {
      if (!title || !tag || !description) {
        toast.error("Please fill all the fields");
        setEmpty(true);
      } else {
        setEmpty(false);
        const newNote = {
          title,
          tag,
          description,
          BgColors: BgColors[Math.floor(Math.random() * BgColors.length)],
        };
        addNotes(newNote);
        toast.success("Successfully added!");
        setTitle("");
        setTag("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="add-notes">
      <form autoComplete="off" className="note-form">
        <input
          type="text"
          placeholder="title"
          value={title}
          required
          className={`${empty ? "input-title empty-input" : "input-title"}`}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="description"
          cols="30"
          rows="2"
          required
          value={description}
          className={`${
            empty ? "input-description empty-input" : "input-description"
          }`}
          onChange={(e) => setDescription(e.target.value)}
        >
          {description}
        </textarea>
        <input
          type="text"
          placeholder="tag"
          value={tag}
          required
          className={`${empty ? "input-tag empty-input" : "input-tag"}`}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit" onClick={submitNote} className="submit-btn">
          Save
        </button>
      </form>
      <div className="note-info">
        <b>📝 This is Note Keeper App just like sticky notes</b>
        <p>
          <b>👉 How to use?</b>
        </p>
        <p>
          <b>1.</b> Add your notes by filling the form
        </p>
        <p>
          <b>2.</b> You can edit and delete your notes
        </p>
        <p>
          <b>3.</b> You can pin your notes
        </p>
        <p>
          <b>4.</b> Pagination is also available
        </p>
        <p>
          <b>5.</b> Database is connected with firebase
        </p>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default AddNotes;
