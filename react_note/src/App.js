import React, { useState, useEffect, Profiler } from "react";
import './App.css';
import './AppB.css';
import Note from "./Note";
import Modal from "./Modal";
import SearchBar from "./SearchBar"; 
import ThemeToggleButton from "./ThemeToggleButton";
import { fetchNotes, handleSearch, handleClearSearch, handleDeleteNote, handleDeleteNoteclick, handleAddNote, handleUpdateNote, handleUpdateNoteclick } from "./utils";
import StatusBar from "./StatusBar";

function App() {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [theme, setTheme] = useState('light');
  const [setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userProfile = await response.json();
        setUserName(userProfile.profile.name); // Mettez à jour le nom de l'utilisateur
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(notes, searchTerm, setFilteredNotes);
  };

  const handleClearClick = () => {
    handleClearSearch(setSearchTerm);
  };

  const handleAddNoteClick = () => {
    handleAddNote(newNoteTitle, newNoteContent, setNotes, setShowModal, setNewNoteTitle, setNewNoteContent)
      .catch(error => setErrorMessage(`Erreur lors de l'ajout de la note : ${error.message}`));
  };  

  const handleUpdateNoteclick = () => {
    handleUpdateNote(selectedNote, newNoteTitle, newNoteContent, notes, setNotes, setShowModal)
      .catch(error => setErrorMessage(`Erreur lors de la modification de la note : ${error.message}`));
  };

  const handleDeleteNoteclick = () => {
    handleDeleteNote(selectedNote, setNotes, setShowModal)
      .catch(error => setErrorMessage(`Erreur lors de la suppression de la note : ${error.message}`));
  };
  

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header className="App-header">
        <br />
        <StatusBar userName={userName} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearchClick}
          handleClearSearch={handleClearClick}
        />
        <br />
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedNote={selectedNote}
          handleAddNote={handleAddNote}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
          notes={notes}
          setNotes={setNotes}
        />
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      
        <div className="notes-container">
          {filteredNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              setSelectedNote={setSelectedNote}
              setShowModal={setShowModal}
              setNewNoteTitle={setNewNoteTitle}
              setNewNoteContent={setNewNoteContent}
              searchTerm={searchTerm}
          />
          ))}
        </div>
        <div className="sidebar">
          <button className="ajout" onClick={() => {
            setSelectedNote(null);
            setShowModal(true);
            setNewNoteTitle("");
            setNewNoteContent("");
          }}>+</button>
        </div>
        <div className="notes-container">
          {loading ? (
            <div className="loading">Chargement en cours...</div>
          ) : (
            notes?.map((note) => (
              <Note
                key={note.id}
                note={note}
                setSelectedNote={setSelectedNote}
                setShowModal={setShowModal}
                setNewNoteTitle={setNewNoteTitle}
                setNewNoteContent={setNewNoteContent}
              />
            ))
          )}
        </div>
        </header>
    </div>
  );
}

export default App;
