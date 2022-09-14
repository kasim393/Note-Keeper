import "./notes.css";
const NoteCard = ({ note }) => {
  return (
    <div className="note-card" style={{ backgroundColor: note.BgColors }}>
      <p className="note-date">{note.timestamp.toDate().toDateString()}</p>
      <p className="note-title">{note.title}</p>
      <p className="note-tag">{note.tag}</p>
      <p className="note-description">{note.description}</p>
    </div>
  );
};

export default NoteCard;
