export const fetchNotes = async (setNotes, setLoading) => {
  try {
    const response = await fetch("/notes");
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  } catch (error) {
    console.error('Erreur lors du chargement des notes :', error);
  }
};

export const handleSearch = (notes, searchTerm, setFilteredNotes) => {
  const filtered = notes.filter(note => {
    const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || contentMatch;
  });
  setFilteredNotes(filtered);
};

export const handleClearSearch = (setSearchTerm) => {
  setSearchTerm('');
};

export const handleDeleteNote = async (selectedNote, setNotes, setShowModal) => {
    try {
      await fetch(`/notes/${selectedNote.id}`, {
        method: "DELETE",
      });
      setNotes(prevNotes => prevNotes.filter(note => note.id !== selectedNote.id)); // Supprime la note de la liste en filtrant les notes qui ont un ID différent de la note sélectionnée
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la note :', error);
    }
  };  

  export const handleAddNote = async (newNoteTitle, newNoteContent, setNotes, setShowModal, setNewNoteTitle, setNewNoteContent) => {
    try {
      const response = await fetch(`/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newNoteTitle, content: newNoteContent }),
      });
      if (!response.ok) {
        throw new Error("Erreur, la nouvelle note n'est pas ajoutée");
      }
      // Mettez à jour l'état des notes en ajoutant la nouvelle note à la liste existante
      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]);
      setShowModal(false);
      setNewNoteTitle("");
      setNewNoteContent("");
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note :', error);
      throw error;
    }
  };
  

export const handleUpdateNote = async (selectedNote, newNoteTitle, newNoteContent, notes, setNotes, setShowModal) => {
    try {
      const response = await fetch(`/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNoteTitle,
          content: newNoteContent
        }),
      });
      const updatedNote = await response.json();
      // Mettre à jour la note uniquement si elle existe dans la liste des notes
      const updatedNotes = notes.map(note => note.id === selectedNote.id ? updatedNote : note);
      setNotes(updatedNotes);
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note :', error);
    }
  };

  export const updateNoteCompletion = async (noteId, completed) => {
    try {
      const response = await fetch(`/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update note completion");
      }
    } catch (error) {
      console.error('Error updating note completion:', error);
      throw error;
    }
  };  
  
  