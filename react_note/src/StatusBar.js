import React, { useState, useEffect } from 'react';

const StatusBar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fonction pour récupérer les informations du profil de l'utilisateur
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userProfile = await response.json();
        const userName = userProfile.profile?.name; // Utilisation de l'opérateur optionnel pour éviter les erreurs si profile est undefined
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    

    fetchUserProfile();
  }, []); 

  return (
    <div className="status-bar">
      <p>Bienvenue, {userName}</p>
    </div>
  );
};

export default StatusBar;
