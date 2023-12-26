document.addEventListener("DOMContentLoaded", function () {
    Modale.init();
})


//ouverture/fermeture modale
const Modale = {
    init: function () {
        this.modale = document.getElementById('modale')
        this.modaleOpen = document.getElementById('modaleOpen')
        this.modaleClose = document.getElementById('modaleClose')
        this.body = document.body
        this.event()
    },
    event: function () {
        const that = this
        this.modaleOpen.addEventListener('click', function () {
            that.modale.classList.add('modale_show')
            that.body.classList.add('overlay')
        })
        this.modaleClose.addEventListener('click', function () {
            that.modale.classList.remove('modale_show')
            that.body.classList.remove('overlay')
        })
    }
}

//modifie contenu modale

const ProjectEditor = {
    init: function () {

    },

    request: function () {

        const url = 'http://localhost:5678/api/works';

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                ProjectEditor.buildGallery(data)
                ProjectEditor.deleteWorks(data)
            })
            .catch(error => console.error('Erreur :', error));
    },

    buildGallery: function (data) {
        const modaleGallery = document.getElementById('modaleGallery')
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const imgProject = element.imageUrl
            const imgAlt = element.title
            const imgPos = document.createElement("figure")
            modaleGallery.appendChild(imgPos)
            imgPos.classList.add('modale_gallery-pos')

            const image = document.createElement("img")
            console.log(imgProject);
            image.src = imgProject
            image.alt = imgAlt
            imgPos.appendChild(image)

            const trashImg = document.createElement("i")
            trashImg.classList.add("fa-solid")
            trashImg.classList.add("fa-trash-can")
            trashImg.classList.add("modale_gallery-trash")
            trashImg.setAttribute("data-id",element.id)
            imgPos.appendChild(trashImg)
        }
    },

    deleteWorks: function (data) {

        const trash = document.querySelectorAll(".modale_gallery-trash")
        for (let index = 0; index < trash.length; index++) {
            const element = trash[index];
            trash[index].addEventListener('click', async function () {

                const id = this.dataset.id 
                console.log(id);
                const url = `http://localhost:5678/api/works/${id}`;
                const token = window.localStorage.getItem("tokenConnexion")
                const userId = window.localStorage.getItem("userId")

                console.log(url);
                console.log(token);
                
                let response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(login),
                    //   body: new FormData(formLogin),
                });

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Selon le type de données que vous envoyez
                  };
                  
                  fetch(url, {
                    method: 'DELETE',
                    headers: headers
                  })
                  .then(response => {
                    if (response.ok) {
                      console.log("La requête DELETE a été exécutée avec succès.");
                    } else {
                      console.error(`Erreur lors de la requête DELETE : ${response.status} - ${response.statusText}`);
                    }
                  })
                  .catch(error => {
                    console.error('Erreur lors de la requête DELETE:', error);
                  });
            })
        }
    },
}

ProjectEditor.request()

