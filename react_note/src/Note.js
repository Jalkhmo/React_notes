import React, { useState } from "react";
import { updateNoteCompletion } from './utils';

const Note = ({ note, setSelectedNote, setShowModal, setNewNoteTitle, setNewNoteContent, searchTerm }) => {
  const [completed, setCompleted] = useState(note.completed || false);

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  const handleToggleCompletion = () => {
    setCompleted(!completed);
    updateNoteCompletion(note.id, !completed); 
  };

  return (
    <div className={`note ${completed ? 'note-done' : ''}`} onClick={() => {
      setSelectedNote(note);
      setShowModal(true);
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);
    }}>
      <div className="note-title">{highlightSearchTerm(note.title, searchTerm)}</div>
      <div
        className="note-content"
        dangerouslySetInnerHTML={{ __html: highlightSearchTerm(note.content, searchTerm) }}
      />
      <button
        className={`completion-button ${completed ? 'completed' : 'not-completed'}`}
        onClick={handleToggleCompletion}
      >
        {completed ? 'Fait' : 'À faire'}
      </button>
    </div>
  );
};

export default Note;
