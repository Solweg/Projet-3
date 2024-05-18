const loginUrl = "http://localhost:5678/api/users/login";
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const credentials = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      console.log("Redirection...");
      window.location.href = "index.html";
    } else {
      const errorData = await response.json();
      if (response.status === 404 && errorData.message === "user not found") {
        alert("Erreur dans l’identifiant ou le mot de passe.");
      } else {
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } else {
      alert("Erreur dans l’identifiant ou le mot de passe.");
    }
  }
});
