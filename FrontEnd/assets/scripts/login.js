document.addEventListener("DOMContentLoaded", function () {
    // apiLogin()

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
            //   body: new FormData(formLogin),
        });

        let result = await response.json();
        console.log(result);
        window.localStorage.setItem("tokenConnexion", result.token);
        window.localStorage.setItem("userId", result.userId);

        if (result.token !== undefined) {
           const loginResult = document.getElementById('loginResult')
            loginResult.innerText = "Vous etes maintenant connecté"
            setTimeout(() => {

                window.location.href = "index.html"
            }, 3000);
            
        }
        else {
            loginResult.innerText = "L'email ou le mot de passe est incorrect"
        }
    });
});











// email: 'sophie.bluel@test.tld',
//     password: 'S0phie',