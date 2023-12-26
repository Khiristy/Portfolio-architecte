window.addEventListener("load", function () {
    Modale.init();
    ProjectEditor.init();
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

            const modaleGallery = document.getElementById('modaleGallery')
            const modaleAddWork = document.getElementById('modaleForm')
            modaleGallery.classList.remove('is_hidden')
            modaleAddWork.classList.add('is_hidden')

        })
    }
}

//modifie contenu modale

const ProjectEditor = {
    init: function () {
        this.request()
        this.switchModale()
        this.addWorks()

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
            image.src = imgProject
            image.alt = imgAlt
            imgPos.appendChild(image)

            const trashImg = document.createElement("i")
            trashImg.classList.add("fa-solid")
            trashImg.classList.add("fa-trash-can")
            trashImg.classList.add("modale_gallery-trash")
            trashImg.setAttribute("data-id", element.id)
            imgPos.appendChild(trashImg)
        }
    },

    addWorks: function () {

        const btnValid = document.getElementById('modale_valid')

        btnValid.addEventListener('click', function () {

            const url = 'http://localhost:5678/api/users/works'
            const token = window.localStorage.getItem("tokenConnexion")
            const userId = window.localStorage.getItem("userId")

            const formData = new FormData();
            const imgUrl = document.querySelector('img').getAttribute('src');
            const title = document.getElementById('champs_projet').value;
            const category = document.getElementById('categorie_projet');
            const categoryValue = category.options[category.selectedIndex].value;

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
                body: formData
            }

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
        })
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

    //*switch Modale*/

    switchModale: function () {

        const btnSwitch = document.getElementById('modaleValid')
        const btnReturn = document.getElementById('modaleReturn')

        const modaleTitle = document.getElementById('modaleTitle')
        const modaleGallery = document.getElementById('modaleGallery')
        const modaleAddWork = document.getElementById('modaleForm')

        btnSwitch.addEventListener('click', function () {

            btnSwitch.innerHTML = 'Valider'
            btnSwitch.classList.add('is_disable')
            modaleTitle.innerHTML = 'Ajout photo'
            modaleGallery.classList.add('is_hidden')
            modaleAddWork.classList.remove('is_hidden')

        })


        btnReturn.addEventListener('click', function () {

            btnSwitch.innerHTML = 'Ajouter une photo'
            btnSwitch.classList.remove('is_disable')
            modaleTitle.innerHTML = 'Gallerie photo'
            modaleGallery.classList.remove('is_hidden')
            modaleAddWork.classList.add('is_hidden')
        })
    },

}




