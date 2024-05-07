const button = document.getElementById("groupedit");
const modal = document.getElementById("modale");
const closemodal = document.getElementById("closemodal");
const contenuModale1 = document.getElementById("contenumodale1");
const contenuModale2 = document.getElementById("contenuModale2");

document.addEventListener("DOMContentLoaded", () => {
  const loginlogout = document.getElementById("loginlogout");
  const ContainerFilters = document.getElementById("ContainerFilters");
  const banner = document.getElementById("banner");
  const edit = document.getElementById("groupedit");

  if (sessionStorage.getItem("token")) {
    loginlogout.textContent = "logout";
    ContainerFilters.style.display = "none";
    banner.style.display = "block";
    edit.style.display = "block";

    loginlogout.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.reload();
    });
  } else {
    banner.style.display = "none";
    edit.style.display = "none";
  }
});

button.addEventListener("click", () => {
  modal.style.display = "flex";
});

closemodal.addEventListener("click", () => {
  modal.style.display = "none";
});

contenuModale1.addEventListener("click", (event) => {
  event.stopPropagation();
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Insertion de la gallerie

async function modalWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const galleriemodale = document.getElementById("galleriemodale");

  works.forEach((work) => {
    const article = document.createElement("article");
    article.setAttribute("data-work-id", work.id);
    const img = document.createElement("img");
    img.src = work.imageUrl;
    article.appendChild(img);

    const trashIcon = createTrashIcon(work.id);
    article.appendChild(trashIcon);

    galleriemodale.appendChild(article);
  });
}

modalWorks();

function createTrashIcon(workId) {
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash-can");
  trashIcon.addEventListener("click", async (e) => {
    e.preventDefault();
    if (
      confirm(
        "Voulez-vous vraiment supprimer ce projet ?\nCette action est irréversible."
      )
    ) {
      try {
        await deleteElement(workId);
        const articleToRemove = trashIcon.parentElement;
        articleToRemove.remove();
      } catch (error) {
        console.error("Erreur lors de la suppression du projet :", error);
      }
    }
  });
  return trashIcon;
}

async function deleteElement(workId) {
  /*La fonction deleteElement semble maintenant correctement formatée et prête à être utilisée pour supprimer un élément de votre base de données via votre API. Elle suit un schéma typique d'une fonction asynchrone qui effectue une requête HTTP DELETE en utilisant fetch.

Voici un résumé de ce que fait cette fonction :

    Elle commence par récupérer le token d'authentification à partir du stockage local (localStorage).
    Si aucun token n'est trouvé, elle retourne simplement de la fonction, car cela signifie probablement que l'utilisateur n'est pas authentifié.
    Elle utilise le token dans les en-têtes de la requête pour s'authentifier auprès de votre API.
    Elle envoie une requête DELETE à l'URL spécifiée pour supprimer l'élément avec l'ID workId.
    Si la réponse de la requête n'est pas OK, elle peut potentiellement gérer différents cas d'erreur. Pour l'instant, elle ne fait rien dans le cas où la réponse indique un statut de 401 (Non autorisé).
    Si une erreur se produit lors de l'exécution de la requête (par exemple, une erreur réseau), elle la capture et la gère.

N'oubliez pas de tester cette fonction pour vous assurer qu'elle fonctionne comme prévu dans le contexte de votre application. Assurez-vous également que votre API est correctement configurée pour gérer les demandes de suppression.
*/
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
      }
    }
  } catch (error) {}
}

const AjouterPhoto = document.getElementById("btn-photo");

AjouterPhoto.addEventListener("click", () => {
  contenuModale1.style.display = "none";

  contenuModale2.style.display = "flex";
});

// fetch les catégories dans les options du formulaire
