import React, { useState } from "react";

const Modal = ({ showModal, setShowModal, selectedNote, newNoteTitle, newNoteContent, handleAddNote, handleDeleteNote, handleUpdateNote }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          {selectedNote ? (
            <div>
              <input
                type="text"
                placeholder="Titre de la note"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Contenu de la note"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button onClick={handleUpdateNote}>Modifier</button>
              <button onClick={handleDeleteNote}>Supprimer</button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Titre de la note"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Contenu de la note"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button onClick={handleAddNote}>Ajouter</button>
            </div>
          )}
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </div>
      </div>
    )
  );
};

export default Modal;
