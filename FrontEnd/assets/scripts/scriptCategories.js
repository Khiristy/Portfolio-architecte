function categories(dataCategories) {
  console.log(dataCategories);




}
// 
// const arrayFigure = document.querySelectorAll("figure")
// buttonAllWork.classList.add('is_actif')



window.addEventListener("load", function () {
  Filter.init();

})


const Filter = {
  init: function () {
    this.filter = document.querySelector(".filter")

    this.arrayFigure = document.querySelectorAll("figure")

    this.buttonAllWork = document.getElementById("allWork")

    this.request()

    // this.button = document.createElement("button")
    // this.element = arrayFigure[index];
    // this.objectCategories = dataCategories[index]

  },

  request: function () {

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
      .then(data => this.buildFilter(data)) // Faire quelque chose avec les données
      .catch(error => console.error('Erreur :', error));
  },

  buildFilter: function (data) {
    for (let index = 0; index < data.length; index++) {

      const objectCategories = data[index];
      const button = document.createElement("button");

      button.innerText = objectCategories.name

      this.filter.appendChild(button)

      button.dataset.categoryId = objectCategories.id
    }
    this.sortProject()
  },

  sortProject: function () {


    const arrayFigure = document.querySelectorAll(".gallery figure")
    this.buttonFilterList = this.filter.querySelectorAll("button")
    console.log(this.buttonFilterList);

    for (let index = 0; index < this.buttonFilterList.length; index++) {
      const button = this.buttonFilterList[index];
      button.addEventListener('click', (e) => {
        const target = e.target
        console.log(target.dataset.categoryId)
        console.log(target)

        for (let index = 0; index < arrayFigure.length; index++) {
          const element = arrayFigure[index];
          console.log(element);
          console.log(target.dataset.categoryId);
          if (element.dataset.categoryId !== target.dataset.categoryId) {
            element.classList.add('hidden');
          } else {
            element.classList.remove('hidden');
          }
        }
        
        for (let index = 0; index < this.buttonFilterList.length; index++) {
          const button = this.buttonFilterList[index];
          button.classList.remove('is_actif');
        }
        button.classList.add('is_actif');
      })
    }

    this.buttonAllWork.addEventListener('click', function () {
      for (let index = 0; index < arrayFigure.length; index++) {
        const element = arrayFigure[index];
        console.log(element);
        console.log(this.dataset.categoryId);
        element.classList.remove('hidden');
      }
      this.classList.add('is_actif')
    })
  },

  }
