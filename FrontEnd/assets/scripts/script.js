window.addEventListener("load", function () {
    Modale.init();
    ProjectEditor.init();
    Connexion.init();
    Filter.init();
    history.replaceState(null, null, "index.html");
    window.scrollTo(0, 0);
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

const Filter = {

    init: function () {
        this.filter = document.querySelector(".filter")

        this.arrayFigure = document.querySelectorAll("figure")

        this.buttonAllWork = document.getElementById("allWork")

        this.request()


    },

    request: function () {

        const url = 'http://localhost:5678/api/categories';

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.buildFilter(data))
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


        this.buttonFilterList = this.filter.querySelectorAll("button")
       

        for (let index = 0; index < this.buttonFilterList.length; index++) {
            const button = this.buttonFilterList[index];
            button.addEventListener('click', (e) => {
                const arrayFigure = document.querySelectorAll(".gallery figure")
                
                const target = e.target
                // console.log(target.dataset.categoryId)

                for (let index = 0; index < arrayFigure.length; index++) {
                    const element = arrayFigure[index];
                    
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
            const arrayFigure = document.querySelectorAll(".gallery figure")
            for (let index = 0; index < arrayFigure.length; index++) {
                const element = arrayFigure[index];

                element.classList.remove('hidden');
            }
            this.classList.add('is_actif')
        })
    },

}
//modifie contenu modale

const ProjectEditor = {

    init() {

        this.modale = document.getElementById('modale');
        this.body = document.body
        this.gallery = document.querySelector(".gallery")
        this.btnSwitch = document.getElementById('modaleBtnSwitch');
        this.btnValid = document.getElementById('modaleBtnValid');
        this.btnReturn = document.getElementById('modaleReturn');
        this.modaleOpen = document.getElementById('modaleOpen');


        this.modaleTitle = document.getElementById('modaleTitle');
        this.modaleGallery = document.getElementById('modaleGallery');
        this.modaleAddWork = document.getElementById('modaleForm');
        this.capsuleTrue = document.getElementById('capsuleTrue');
        this.capsuleFalse = document.getElementById('capsuleFalse');
        this.capsuleFalseSize = document.getElementById('capsuleFalseSize');
        this.capsuleFalseType = document.getElementById('capsuleFalseType');

        this.modaleFormImg = document.getElementById('modaleFormImg');
        this.fileInputImg = document.getElementById('fileInputImg');
        this.modaleLabelPhoto = document.getElementById('modaleLabelPhoto'),
        this.formEditTitle = document.getElementById('formEditTitle');
        this.formEditCat = document.getElementById('formEditCat');

        this.allFieldsHaveValues = true;
        this.imgFieldValid = true;

        this.step = 1


        this.requestWorks()
        this.requestCategories()
        this.switchModale()
        this.gotostep(this.step)
        this.checkFormModale();
        this.addImgForm();
        this.checkImgImportModaleFormat();

    },

    requestWorks() {

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
                ProjectEditor.buildGalleryFront(data)
            })
            .catch(error => console.error('Erreur :', error));
    },

    requestCategories() {

        const url = 'http://localhost:5678/api/categories';

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.buildSelectCategories(data))
            .catch(error => console.error('Erreur :', error));
    },

    buildGalleryFront(data) {

        this.gallery.innerHTML = ''

        for (let index = 0; index < data.length; index++) {

            const work = data[index];

            const figure = document.createElement("figure")
            figure.dataset.categoryId = work.categoryId
            figure.classList.add("project")

            const img = document.createElement("img")
            img.src = work.imageUrl
            img.alt = work.title

            const figcaption = document.createElement("figcaption")
            figcaption.innerText = work.title

            this.gallery.appendChild(figure)
            figure.appendChild(img)
            figure.appendChild(figcaption)
        }
       
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

    buildSelectCategories(data) {


        for (let index = 0; index < data.length; index++) {
            const categorie = data[index];
            const option = document.createElement('option')
            option.value = categorie.id
            option.innerHTML = categorie.name
            this.formEditCat.appendChild(option)
        }
    },

    checkFormModale() {

        this.btnValid.classList.add('is_disable');
        
        const checkAllFields = () => {
            this.allFieldsHaveValues = true





            if (this.fileInputImg.value.trim() === '' || this.formEditTitle.value.trim() === '' || parseInt(this.formEditCat.value.trim()) === 0) {
                this.allFieldsHaveValues = false;
                this.btnValid.classList.add('is_disable');
            }

            else {
              
                this.btnValid.classList.remove('is_disable');
                this.capsuleFalse.classList.add('hidden')
            }

        }


        function handleFieldsCheck() {

            if (checkAllFields()) {
                console.log('Tous les champs ont des valeurs.');
            }

            else {
                console.log('Au moins un champ est vide.');
            }
        }

        this.fileInputImg.addEventListener('input', checkAllFields);
        this.formEditTitle.addEventListener('input', checkAllFields);
        this.formEditCat.addEventListener('input', checkAllFields);

    },

    addImgForm() {
        this.fileInputImg.addEventListener('input', () => {
            const imgImportModale = document.getElementById('fileInputImg').files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                this.modaleFormImg.src = reader.result;
                this.checkImgImportModaleFormat(imgImportModale);
            });

            if (imgImportModale) {
                reader.readAsDataURL(imgImportModale);
                this.modaleLabelPhoto.classList.add('hidden');
            }
        });
    },

    checkImgImportModaleFormat(imgImportModale) {
        if (imgImportModale) {

            if (imgImportModale.size > 4 * 1024 * 1024) {

                this.capsuleFalseSize.classList.remove('hidden');
                this.imgFieldValid = false

            } else {
                this.capsuleFalseSize.classList.add('hidden');
            }

            if (!imgImportModale.type.match(/image\/(png|jpg|jpeg)/)) {

                this.imgFieldValid = false
                this.capsuleFalseType.classList.remove('hidden');

            } else {
                this.capsuleFalseType.classList.add('hidden');
            }
        }
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
        ProjectEditor.requestWorks()
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
       
        switch (step) {

            case 1:
                this.btnSwitch.innerHTML = 'Ajouter une photo'
                this.btnSwitch.classList.remove('is_hidden')
                this.btnValid.classList.remove('is_actif')


                this.modaleTitle.innerHTML = 'Gallerie photo'
                this.modaleGallery.classList.remove('is_hidden')
                this.modaleAddWork.classList.add('is_hidden')
                this.btnReturn.classList.add('is_hidden')
                this.capsuleTrue.classList.add('hidden')
                this.capsuleFalse.classList.add('hidden')

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
                break;

            case 3:
            
                if (this.allFieldsHaveValues && this.imgFieldValid) {
                    this.capsuleTrue.classList.remove('hidden')
                    this.modaleFormImg.src = ''
                    this.addWorks()
                    this.modaleAddWork.reset()
                    this.allFieldsHaveValues = true
                    this.imgFieldValid = true
                    this
                    setTimeout(() => {
                        this.capsuleTrue.classList.add('hidden')
                        this.capsuleFalse.classList.add('hidden')
                        this.step = 2
                        this.gotostep(this.step)
                    }, 2000);
                }

                else {
                    this.step = 2
                    this.gotostep(this.step)
                    this.capsuleFalse.classList.remove('hidden')
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
        this.filter = document.getElementById('filter')

        this.resetConnexion()
        this.editMod()
        this.contactRedirection()
        this.projetRedirection()
        this.RedirectionModule()
    },

    async editMod() {

        if (this.token !== undefined && this.token !== null) {
            this.modaleOpen.classList.remove('hidden')
            this.editBar.classList.remove('hidden')
            this.logoutBtn.classList.remove('hidden')
            this.loginBtn.classList.add('hidden')
            this.filter.classList.add('hidden')

        }
        else {
            this.modaleOpen.classList.add('hidden')
            this.editBar.classList.add('hidden')
            this.logoutBtn.classList.add('hidden')
            this.loginBtn.classList.remove('hidden')
            this.filter.classList.remove('hidden')

        }
    },

    resetConnexion() {

        this.logoutBtn.addEventListener('click', () => {
            this.token = window.localStorage.removeItem("tokenConnexion")
            this.editMod()
        })
    },

    RedirectionModule () {

        let projetsScrollCompleted = false;
    
        function scrollToProjets() {
            document.getElementById('projets').scrollIntoView({ behavior: "smooth" });
        }
    
        window.addEventListener('scroll', () => {
            if (!projetsScrollCompleted && window.scrollY > 0) {
                projetsScrollCompleted = true;
                Connexion.contactRedirection();
            }
        });
    
        function contactRedirection() {
            let params = new URLSearchParams(window.location.search);
            let destination = params.get('destination');
    
            if (destination === 'contact' && projetsScrollCompleted) {
                setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({ behavior: "smooth" });
                }, 250);
            }
        }
    
        function init() {
            window.addEventListener('load', () => {
                scrollToProjets();
            });
        }
    
        return {
            init: init
        };
    },

    contactRedirection() {

        let params = new URLSearchParams(window.location.search);
        let destination = params.get('destination');

        if (destination === 'contact' && window.scrollY === 0) {
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({ behavior: "smooth" });
            }, 500);
        }

    },

    projetRedirection() {

        let params = new URLSearchParams(window.location.search);
        let destination = params.get('destination');
        if (destination === 'projets') {
            setTimeout(() => {
                document.getElementById('projets').scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    },

}

