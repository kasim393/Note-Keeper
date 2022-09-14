import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import "./modal.css";
import { ModalContext } from "../../context/modal.context";
import { deleteNotes, editNotes } from "../../utils/firebase";
const Modal = () => {
  const { closeModal, notes } = useContext(ModalContext);
  const [title, setTitle] = useState(notes.title);
  const [tag, setTag] = useState(notes.tag);
  const [description, setDescription] = useState(notes.description);
  const submitNote = (e) => {
    e.preventDefault();
    if (!title || !tag || !description) {
      toast.error("Please fill all the fields");
    } else {
      const newNote = {
        id: notes.id,
        title,
        tag,
        description,
      };
      editNotes(newNote);
      toast.success("Successfully Updated!");
      closeModal();
    }
  };

  const deleteNote = (e) => {
    e.preventDefault();
    deleteNotes(notes);
    toast("Note has been Deleted!", {
      icon: "🗑️",
    });
    closeModal();
  };

  return (
    <motion.div
      className="modal-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        className="modal-body"
        style={{ backgroundColor: notes.BgColors }}
      >
        <div className="modal-header">
          <AiOutlineClose className="icon" onClick={closeModal} />
        </div>
        <div className="modal-content">
          <p className="modal-date">
            {notes.timestamp.toDate().toDateString()}
          </p>
          <form autoComplete="off">
            <input
              type="text"
              placeholder="title"
              value={title}
              className={`${
                !title ? "modal-title empty-input" : "modal-title"
              }`}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="description"
              cols="30"
              rows="2"
              className={`${
                !description
                  ? "modal-description empty-input"
                  : "modal-description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
            <input
              type="text"
              placeholder="tag"
              value={tag}
              className={`${!tag ? "modal-tag empty-input" : "modal-tag"}`}
              onChange={(e) => setTag(e.target.value)}
            />

            <div className="btn-container">
              <button type="submit" className="submit-btn" onClick={submitNote}>
                Update
              </button>

              <FcFullTrash className="delete-btn" onClick={deleteNote} />
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
