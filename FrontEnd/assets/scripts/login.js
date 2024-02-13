document.addEventListener("DOMContentLoaded", function () {

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