// Sélection de l'URL et du formulaire de connexion :

const loginUrl = "http://localhost:5678/api/users/login";
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  // empêche le rechargement de la page

  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const credentials = {
    email: email,
    password: password,
  };
  // Envoi de la requête de connexion à l'API :
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Traitement de la réponse de l'API :
    if (response.ok) {
      const data = await response.json();

      // Stockage du token dans sessionstorage
      sessionStorage.setItem("token", data.token);
      console.log("Redirection...");
      window.location.href = "index.html";
    } else {
      // Gestion des erreurs

      const errorData = await response.json();
      if (response.status === 404 && errorData.message === "user not found") {
      } else {
        const errorMessage = document.getElementById("errormessage");
        errorMessage.textContent =
          "Erreur dans l’identifiant ou le mot de passe.";
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
