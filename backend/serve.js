// Importer Express.js
const express = require('express');
const app = express();

// Endpoint pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  // Code pour récupérer les utilisateurs depuis votre base de données ou toute autre source de données
  // Exemple fictif
  const users = [
    {
      "email": "popo",
      "password": "popo",
      "name": "popo",
      "id": 1
    },
    {
      "email": "Kevin@gmail.com",
      "password": "Kevin",
      "name": "Kevin",
      "id": 2
    },
    {
      "email": "paul@gmail.com",
      "password": "Paul",
      "name": "Paul",
      "id": 3
    }
    // ... d'autres utilisateurs
  ];

  // Envoyer la réponse JSON avec les utilisateurs
  res.json(users);
});

// Endpoint pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  // Code pour créer un nouvel utilisateur en fonction des données reçues dans req.body
  // Exemple fictif
  const newUser = {
    id: 3,
    name: 'Nouvel utilisateur',
    // ... d'autres données de nouvel utilisateur
  };

  // Envoyer la réponse JSON avec le nouvel utilisateur créé
  res.json(newUser);
});

// D'autres endpoints peuvent être ajoutés de manière similaire pour gérer les autres fonctionnalités de votre application

// Démarrage du serveur sur un port spécifique (par exemple, le port 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT} !`);
});
