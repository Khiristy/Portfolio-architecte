document.addEventListener("DOMContentLoaded", function () {
    const contact = document.getElementById('contactLink')
    contact.addEventListener("click", function(event) {
        event.preventDefault(); // Empêche le comportement par défaut de l'ancre
        let url = this.getAttribute("href"); // Récupère l'URL de la page cible
      
        // Une fois que la page cible est chargée, exécute le code
        window.onload = function() {
          // Mettez votre code JavaScript ici
          console.log("Le JavaScript de la page cible est chargé !");
          // Par exemple, vous pouvez exécuter une fonction spécifique une fois que la page cible est chargée
          // maFonction();
          // Rediriger vers la page cible une fois que le JavaScript est chargé
          window.location.href = url;
        };
      });
    const formLogin = document.getElementById("formlogin");


      
    formLogin.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email")
        const password = document.getElementById("password")

        const login = {
            email: email.value,
            password: password.value,
        };

        console.log(e);
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        let result = await response.json();
        console.log(result);
        window.localStorage.setItem("tokenConnexion", result.token);
        window.localStorage.setItem("userId", result.userId);

        const capsuleFalse = document.getElementById('capsuleFalse')
        const capsuleTrue = document.getElementById('capsuleTrue')


        if (result.token !== undefined) {
           capsuleTrue.classList.remove('hidden')
           capsuleFalse.classList.add('hidden')

            setTimeout(() => {
                window.location.href = "index.html"
            }, 1500);
            
        }
        else {
            capsuleFalse.classList.remove('hidden')
            capsuleTrue.classList.add('hidden')

        }
    });
});











// email: 'sophie.bluel@test.tld',
//     password: 'S0phie',