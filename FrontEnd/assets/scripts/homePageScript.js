window.addEventListener("load", function () {
    Modale.init();
    ProjectEditor.init();
    Connexion.init();
})



//ouverture/fermeture modale
const Modale = {

    init() {

        this.modale = document.getElementById('modale')
        this.modaleOpen = document.getElementById('modaleOpen')
        this.modaleClose = document.getElementById('modaleClose')
        this.body = document.body
        this.event()
    },

    hide() {

        this.modale.classList.remove('modale_show')
        this.body.classList.remove('overlay')

        const modaleGallery = document.getElementById('modaleGallery')
        const modaleAddWork = document.getElementById('modaleForm')

        modaleGallery.classList.remove('is_hidden')
        modaleAddWork.classList.add('is_hidden')

    },

    event() {

        this.modaleOpen.addEventListener('click', (e) => {

            const target = e.target
            this.modale.classList.add('modale_show')
            setTimeout(() => {
                this.body.classList.add('overlay')
            }, 100);
        })

        this.modaleClose.addEventListener('click', () => {

            this.hide()
        })

        this.body.addEventListener('click', (e) => {

            if (this.body.classList.contains('overlay')) {
                this.hide()
            }
        })

        this.modale.addEventListener('click', (e) => {

            e.stopPropagation()
        })
    },
}


//modifie contenu modale

const ProjectEditor = {

    init() {

        this.modale = document.getElementById('modale');
        this.body = document.body
        this.btnSwitch = document.getElementById('modaleBtnSwitch');
        this.btnValid = document.getElementById('modaleBtnValid');
        this.btnReturn = document.getElementById('modaleReturn');
        this.modaleOpen = document.getElementById('modaleOpen');


        this.modaleTitle = document.getElementById('modaleTitle');
        this.modaleGallery = document.getElementById('modaleGallery');
        this.modaleAddWork = document.getElementById('modaleForm');
        this.modaleFormCheckTrue = document.getElementById('modaleFormCheckTrue');
        this.modaleFormCheckFalse = document.getElementById('modaleFormCheckFalse');
        this.modaleFormCheckPos = document.getElementById('modaleFormCheckPos');

        this.modaleFormImg = document.getElementById('modaleFormImg');
        this.fileInputImg = document.getElementById('fileInputImg');
        this.modaleLabelPhoto = document.getElementById('modaleLabelPhoto'),
        this.formEditTitle = document.getElementById('formEditTitle');
        this.formEditCat = document.getElementById('formEditCat');

        this.step = 1


        this.request()
        this.switchModale()
        this.gotostep(this.step)
        this.checkFormModale();
        this.addImgForm();

    },

    request() {

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
                buildGalleryFront(data)
            })
            .catch(error => console.error('Erreur :', error));
    },

    buildGallery(data) {

        const modaleGallery = document.getElementById('modaleGallery')
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const imgProject = element.imageUrl
            const imgAlt = element.title

            const figure = document.createElement("figure")
            modaleGallery.appendChild(figure)
            figure.classList.add('modale_gallery-figure')

            const image = document.createElement("img")
            image.src = imgProject
            image.alt = imgAlt
            figure.appendChild(image)

            const trashImg = document.createElement("i")
            trashImg.classList.add("fa-solid")
            trashImg.classList.add("fa-trash-can")
            trashImg.classList.add("modale_gallery-trash")
            trashImg.setAttribute("data-id", element.id)
            figure.appendChild(trashImg)
        }
    },

    checkFormModale() {

        let allFieldsHaveValues = false;
        this.btnValid.classList.add('is_disable');

        const checkAllFields = () => {

            if (this.fileInputImg.value.trim() !== '' && this.formEditTitle.value.trim() !== '' && parseInt(this.formEditCat.value.trim()) >= 1) {
                this.allFieldsHaveValues = true;
                this.btnValid.classList.remove('is_disable');
                this.modaleFormCheckFalse.classList.remove('is_actif')

            }

            else {
                this.allFieldsHaveValues = false;
                this.btnValid.classList.add('is_disable');
            }

            return this.allFieldsHaveValues;
        }

        function handleFieldsCheck() {

            if (checkAllFields()) {
                console.log('Tous les champs ont des valeurs.');
            }

            else {
                console.log('Au moins un champ est vide.');
            }
        }

        this.fileInputImg.addEventListener('input', handleFieldsCheck);
        this.formEditTitle.addEventListener('input', handleFieldsCheck);
        this.formEditCat.addEventListener('input', handleFieldsCheck);

    },
 
    addImgForm() {

        this.fileInputImg.addEventListener('input', () => {

            const file = document.getElementById('fileInputImg').files[0];
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    this.modaleFormImg.src = reader.result;
                },
                false,
            );

            if (file) {
                reader.readAsDataURL(file);
                this.modaleLabelPhoto.classList.add('hidden')
            }
        });
    },

    addWorks() {

        const url = 'http://localhost:5678/api/works'
        const token = window.localStorage.getItem("tokenConnexion")

        const formData = new FormData(document.getElementById('modaleForm'));

        const imgUrl = document.getElementById('fileInputImg').getAttribute('src');
        const title = document.getElementById('formEditTitle').value;
        const category = document.getElementById('formEditCat');
        const categoryValue = category.options[category.selectedIndex].value;
        console.log(formData);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            },

            body: formData
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(function (data) {
                ProjectEditor.reloadGallery()
            })
            .catch(error => console.error('Erreur :', error));

    },

    deleteWorks(data) {

        const trash = document.querySelectorAll(".modale_gallery-trash")
        for (let index = 0; index < trash.length; index++) {
            const element = trash[index];
            trash[index].addEventListener('click', async function () {

                const projectId = this.dataset.id
                console.log(projectId);
                const url = `http://localhost:5678/api/works/${projectId}`;
                const token = window.localStorage.getItem("tokenConnexion")

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                fetch(url, {
                    method: 'DELETE',
                    headers: headers
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(response);
                            console.log("La requête DELETE a été exécutée avec succès.");
                            ProjectEditor.reloadGallery()
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

    reloadGallery() {

        const figures = document.querySelectorAll(".modale_gallery-figure")
        for (let index = 0; index < figures.length; index++) {
            const figure = figures[index];
            figure.remove()
        }
        ProjectEditor.request()
    },

    //*switch Modale*/

    switchModale() {

        this.modaleOpen.addEventListener('click', () => {

            this.step = 1
            this.gotostep(this.step)
        })

        this.btnSwitch.addEventListener('click', () => {

            if (this.step <= 2) {
                this.step++
                this.gotostep(this.step)
            }
        })

        this.btnValid.addEventListener('click', () => {

            if (this.step < 3) {
                this.step++
                this.gotostep(this.step)
            }
        })

        this.btnReturn.addEventListener('click', () => {

            if (this.step > 1) {
                this.step--
                this.gotostep(this.step)
            }
        })
    },

    gotostep(step) {
        console.log(step);
        switch (step) {

            case 1:
                this.btnSwitch.innerHTML = 'Ajouter une photo'
                this.btnSwitch.classList.remove('is_hidden')
                this.btnValid.classList.remove('is_actif')


                this.modaleTitle.innerHTML = 'Gallerie photo'
                this.modaleGallery.classList.remove('is_hidden')
                this.modaleAddWork.classList.add('is_hidden')
                this.btnReturn.classList.add('is_hidden')
                this.modaleFormCheckTrue.classList.remove('is_actif')
                this.modaleFormCheckFalse.classList.remove('is_actif')

                break;

            case 2:
                this.btnValid.innerHTML = 'Valider'
                this.btnSwitch.classList.add('is_hidden')
                this.btnReturn.classList.remove('is_hidden')
                this.btnValid.classList.add('is_actif')
                this.btnValid.classList.add('is_disable')


                this.modaleTitle.innerHTML = 'Ajout photo'
                this.modaleGallery.classList.add('is_hidden')
                this.modaleAddWork.classList.remove('is_hidden')
                this.modaleFormCheckTrue.classList.remove('is_actif')
                this.modaleFormCheckFalse.classList.remove('is_actif')

                break;

            case 3:

                if (this.allFieldsHaveValues) {
                    this.modaleFormCheckTrue.classList.add('is_actif')
                    this.modaleFormImg.src = ''
                    this.addWorks()
                    this.modaleAddWork.reset()
                    this.allFieldsHaveValues = false
                    this
                    setTimeout(() => {
                        this.modaleFormCheckTrue.classList.remove('is_actif')
                        this.modaleFormCheckFalse.classList.remove('is_actif')
                        this.step = 2
                        this.gotostep(this.step)
                    }, 2000);
                }

                else {
                    this.step = 2
                    this.gotostep(this.step)
                    this.modaleFormCheckFalse.classList.add('is_actif')
                }
                break;

            default:
                console.log('error');
                break;
        }

    },
}

const Connexion = {
    
    init() {

        this.loginBtn = document.getElementById('loginBtn')
        this.logoutBtn = document.getElementById('logoutBtn')
        this.token = window.localStorage.getItem("tokenConnexion")
        this.modaleOpen = document.getElementById('modaleOpen')
        this.editBar = document.getElementById('editBar')

        this.resetConnexion()
        this.editMod()
    },

    request() {

    },

    async editMod () {

        if (this.token !== undefined && this.token !== null) {
            this.modaleOpen.classList.remove('hidden')
            this.editBar.classList.remove('hidden')
            this.logoutBtn.classList.remove('hidden')
            this.loginBtn.classList.add('hidden')

        }
        else {
            this.modaleOpen.classList.add('hidden')
            this.editBar.classList.add('hidden')
            this.logoutBtn.classList.add('hidden')
            this.loginBtn.classList.remove('hidden')
        }
    },

    resetConnexion() {

        this.logoutBtn.addEventListener('click',() => {
            this.token = window.localStorage.removeItem("tokenConnexion")
            this.editMod()
        })
    },
}
