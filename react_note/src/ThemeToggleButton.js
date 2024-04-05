import React from "react";

const ThemeToggleButton = ({ theme, toggleTheme }) => {
  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
    </button>
  );
};

export default ThemeToggleButton;
