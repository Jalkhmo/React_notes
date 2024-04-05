import React, { useState, useEffect } from "react";
import './App.css';
import './AppB.css';
import Note from "./Note";
import Modal from "./Modal";
import utils from "./utils"; // eslint-disable-line no-unused-vars
import { handleDeleteNote } from "./utils";
import SearchBar from "./SearchBar"; // eslint-disable-line no-unused-vars
import ThemeToggleButton from "./ThemeToggleButton";
import { fetchNotes, handleSearch, handleClearSearch, handleAddNote } from "./utils";

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
  

  useEffect(() => {
    fetchNotes(setNotes, setLoading);
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
    handleAddNote(newNoteTitle, newNoteContent, setNotes, setShowModal, setNewNoteTitle, setNewNoteContent);
  };
  
  const handleUpdateNote = () => {
    handleUpdateNote(selectedNote, newNoteTitle, newNoteContent, notes, setNotes, setShowModal);
  }

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header className="App-header">
        <br />
        <div className="search-bar">
          <input
            type="text"
            placeholder="Mots clé :"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="clear-button" onClick={handleClearClick}>X</button>
          )}
          <button className="search-button" onClick={handleSearchClick}>Rechercher</button>
        </div>
        <br />
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedNote={selectedNote}
          newNoteTitle={newNoteTitle}
          newNoteContent={newNoteContent}
          handleAddNote={handleAddNoteClick}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
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
