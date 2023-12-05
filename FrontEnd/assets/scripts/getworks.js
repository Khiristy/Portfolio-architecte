const urlLogin = 'http://localhost:5678/api/users/login';

// Données à envoyer dans la requête (si nécessaire)
const login = {
  user : 'sophie.bluel@test.tld',
  password : 'S0phie',
};

// Configuration de la requête
const requestOptions = {
  method: 'POST', // Méthode de la requête
  headers: {
    'Content-Type': 'application/json' // Type de contenu du corps de la requête
    // Vous pouvez également ajouter d'autres en-têtes ici si nécessaire
  },
  body: JSON.stringify(login) // Corps de la requête (converti en format JSON)
};

// Effectuer la requête Fetch
fetch(urlLogin, requestOptions)
  .then(response => response.json()) // Analyser la réponse JSON
  .then(data => console.log(data)) // Faire quelque chose avec les données
  .catch(error => console.error('Erreur :', error));