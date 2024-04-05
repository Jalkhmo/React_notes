import Note from "./Note";

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

export const handleAddNote = async (newNoteTitle, newNoteContent, setNotes, setShowModal, setNewNoteTitle, setNewNoteContent) => {
  try {
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newNoteTitle,
        content: newNoteContent
      }),
    });
    const data = await response.json();
    setNotes(prevNotes => [data, ...prevNotes]);
    setShowModal(false);
    setNewNoteTitle("");
    setNewNoteContent("");
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la nouvelle note :', error);
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
    setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
    setShowModal(false);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la note :', error);
  }
};
 