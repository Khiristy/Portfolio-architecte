function Gallery(data) {
  console.log(data);
  for (let index = 0; index < data.length; index++) {

    const work = data[index];

    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")

    const img = document.createElement("img")
    img.src = work.imageUrl
    img.alt = work.title

    const figcaption = document.createElement("figcaption")
    figcaption.innerText = work.title

    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)

  }
}






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

// apiLogin()

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

apiGetWorks()

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
    .then(data => console.log(data)) // Faire quelque chose avec les données
    .catch(error => console.error('Erreur :', error));

}

apiGetCategories()




















function apiPostWorks() {

  const url = 'http://localhost:5678/api/users/works';

  // Données à envoyer dans la requête (si nécessaire)
  const login = {
    image : '',
    title : 'sdvsvsdv',
    category : 1442424,
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
apiPostWorks()


