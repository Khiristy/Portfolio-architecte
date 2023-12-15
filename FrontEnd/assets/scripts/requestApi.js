
function apiLogin() {

  const url = 'http://localhost:5678/api/users/login';

  // Données à envoyer dans la requête (si nécessaire)
  const login = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie',
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
  fetch(url, requestOptions)
    .then(response => response.json()) // Analyser la réponse JSON
    .then(data => console.log(data)) // Faire quelque chose avec les données
    .catch(error => console.error('Erreur :', error));

}



function apiGetWorks() {

  const url = 'http://localhost:5678/api/works';


  // Configuration de la requête
  const requestOptions = {
    method: 'GET', // Méthode de la requête
    headers: {
      'Content-Type': 'application/json' // Type de contenu du corps de la requête
      // Vous pouvez également ajouter d'autres en-têtes ici si nécessaire
    },
    // body: "" // Corps de la requête (converti en format JSON)
  };

  // Effectuer la requête Fetch
  fetch(url, requestOptions)
    .then(response => response.json()) // Analyser la réponse JSON
    .then(data => Gallery(data)) // Faire quelque chose avec les données
    .catch(error => console.error('Erreur :', error));

}



function apiGetCategories() {

  const url = 'http://localhost:5678/api/categories';


  // Configuration de la requête
  const requestOptions = {
    method: 'GET', // Méthode de la requête
    headers: {
      'Content-Type': 'application/json' // Type de contenu du corps de la requête
      // Vous pouvez également ajouter d'autres en-têtes ici si nécessaire
    },
  };

  // Effectuer la requête Fetch
  fetch(url, requestOptions)
    .then(response => response.json()) // Analyser la réponse JSON
    .then(data => categories(data)) // Faire quelque chose avec les données
    .catch(error => console.error('Erreur :', error));

}




function apiPostWorks() {

  const url = 'http://localhost:5678/api/users/works';

  // Données à envoyer dans la requête (si nécessaire)
  const login = {
    image : '',
    title : '',
    category : '',
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
  fetch(url, requestOptions)
    .then(response => response.json()) // Analyser la réponse JSON
    .then(data => console.log(data)) // Faire quelque chose avec les données
    .catch(error => console.error('Erreur :', error));

}


// apiPostWorks()


