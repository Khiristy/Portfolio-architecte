document.addEventListener("DOMContentLoaded", function () {
  // apiLogin()

  const formLogin = document.getElementById("form_login");

  formLogin.addEventListener("submit", async function (e) {
    const login = {
      email: "sophie.bluel@test.tld",
      password: "S0phie",
    };

    e.preventDefault();
    console.log(e);
    let response = await fetch("/api/users/login", {
      method: "POST",
      body: new FormData(formLogin),
    });

    let result = await response.json();
    console.log(result);
    alert(result.message);
  });
});
