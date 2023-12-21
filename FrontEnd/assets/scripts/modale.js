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
            imgPos.appendChild(trashImg)
        }
    },

    deleteWorks: function (data) {

        const trash = document.querySelectorAll(".modale_gallery-trash")
        for (let index = 0; index < trash.length; index++) {
            const element = trash[index];
            trash[index].addEventListener('click', async function () {

                const url = 'http://localhost:5678/api/users//works/{id}';
                const token = window.localStorage.getItem("tokenConnexion")
                const userId = window.localStorage.getItem("userId")

                const login = {
                    email: email.value,
                    password: password.value,
                };


                console.log(e);
                let response = await fetch("http://localhost:5678/api/users//works/{id}", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(login),
                    //   body: new FormData(formLogin),
                });

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Erreur :', error));
            })
        }
    },
}

ProjectEditor.request()

