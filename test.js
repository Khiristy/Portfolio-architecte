// URL de l'API ou du service que vous souhaitez interroger
const urlLogin = 'https://exemple.com/api/endpoint';

// Données à envoyer dans la requête (si nécessaire)
const data = {
  key1: 'valeur1',
  key2: 'valeur2'
};

// Configuration de la requête
const requestOptions = {
  method: 'POST', // Méthode de la requête
  headers: {
    'Content-Type': 'application/json' // Type de contenu du corps de la requête
    // Vous pouvez également ajouter d'autres en-têtes ici si nécessaire
  },
  body: JSON.stringify(data) // Corps de la requête (converti en format JSON)
};

// Effectuer la requête Fetch
fetch(url, requestOptions)
  .then(response => response.json()) // Analyser la réponse JSON
  .then(data => console.log(data)) // Faire quelque chose avec les données
  .catch(error => console.error('Erreur :', error));