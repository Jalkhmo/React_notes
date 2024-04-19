import React, { useState } from "react";

const Modal = ({ showModal, setShowModal, selectedNote, handleAddNote, handleDeleteNote, handleUpdateNote, notes, setNotes }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNoteClick = () => {
    // Vérifiez si les champs titre et contenu ne sont pas vides avant d'ajouter la note
    if (newTitle.trim() !== "" && newContent.trim() !== "") {
      handleAddNote(newTitle, newContent);
      // Réinitialisez les champs après l'ajout de la note
      setNewTitle("");
      setNewContent("");
      setShowModal(false);
    } else {
      // Gérez le cas où l'utilisateur n'a pas rempli tous les champs
      alert("Veuillez remplir tous les champs avant d'ajouter une note.");
    }
  };

  const handleUpdateNoteClick = () => {
    // Ajoutez la logique pour mettre à jour la note sélectionnée
    handleUpdateNote(selectedNote);
    setShowModal(false);
  };

  const handleDeleteNoteClick = () => {
    // Ajoutez la logique pour supprimer la note sélectionnée
    handleDeleteNote(selectedNote);
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          {!selectedNote ? (
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
              <button onClick={handleAddNoteClick}>Ajouter</button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Titre de la note"
                value={selectedNote.title}
                readOnly
              />
              <textarea
                placeholder="Contenu de la note"
                value={selectedNote.content}
                readOnly
              />
              <button onClick={() => handleUpdateNote(selectedNote)}>Modifier</button>
              <button onClick={() => handleDeleteNote(selectedNote)}>Supprimer</button>
            </div>
          )}
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </div>
      </div>
    )
  );
};

export default Modal;

