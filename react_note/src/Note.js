import React from "react";

const Note = ({ note, setSelectedNote, setShowModal, setNewNoteTitle, setNewNoteContent }) => {
  return (
    <div className="note" onClick={() => {
      setSelectedNote(note);
      setShowModal(true);
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);
    }}>
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content.length > 45 ? `${note.content.slice(0, 45)}...` : note.content}</div>
    </div>
  );
};

export default Note;
