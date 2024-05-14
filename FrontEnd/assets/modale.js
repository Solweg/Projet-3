document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("groupedit");
  const modal = document.getElementById("modale");
  const modalcontent1 = document.getElementById("modalcontent1");
  const modalcontent2 = document.getElementById("modalcontent2");

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

  // Fermeture de la modale:

  const closemodal1 = document.getElementById("closemodal1");
  const closemodal2 = document.getElementById("closemodal2");
  // Réinitialiser les champs du formulaire de la modale 1
  closemodal1.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function resetModalForm() {
    imageUpload.value = null;
    titreInput.value = "";
    categorySelect.value = "";
  }

  closemodal2.addEventListener("click", () => {
    modal.style.display = "none";
    resetModalForm();
  });

  modalcontent1.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalcontent2.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Afficher la modale 2
  const AjouterPhoto = document.getElementById("btn-photo");

  AjouterPhoto.addEventListener("click", () => {
    modalcontent1.style.display = "none";
    modalcontent2.style.display = "flex";
  });

  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  button.addEventListener("click", () => {
    // Assurez-vous que la modal 2 est cachée
    modalcontent2.style.display = "none";
    // Affichez la modal 1
    modalcontent1.style.display = "flex";
    // Affichez la modale principale
    modal.style.display = "flex";
  });
  // Retour modale 1:
  const arrowBack = document.getElementById("arrowback");

  arrowBack.addEventListener("click", () => {
    // Afficher la modal 1 et cacher la modal 2
    modalcontent1.style.display = "flex";
    modalcontent2.style.display = "none";
  });

  // Insertion de la galerie
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
          "Voulez-vous vraiment supprimer ce projet?\nCette action est irréversible."
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
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        `http://localhost:5678/api/works/${workId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
        }
      }
    } catch (error) {}
  }

  // fetch les catégories dans les options du formulaire
  const categorySelect = document.getElementById("category");

  function loadCategories() {
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories :", error);
      });
  }

  loadCategories();

  // miniature image
  const imageUpload = document.getElementById("imageUpload");

  imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      const imageElement = document.createElement("img");
      imageElement.src = imageURL;
      imageElement.alt = "Image miniature";

      const pictureForm = document.querySelector(".picture-form");
      pictureForm.innerHTML = ""; // Effacer le contenu existant
      pictureForm.appendChild(imageElement);

      imageElement.onload = function () {
        URL.revokeObjectURL(imageURL);
      };
    }
  });

  // Récupérer les éléments du formulaire
  const titreInput = document.getElementById("Titre");
  const submitButton = document.querySelector('button[type="submit"]');

  // Fonction pour vérifier si tous les champs sont remplis
  function checkForm() {
    const imageFilled = imageUpload.files.length > 0;
    const titreFilled = titreInput.value.trim() !== "";
    const categoryFilled = categorySelect.value.trim() !== "";

    // Vérifier si tous les champs sont remplis
    if (imageFilled && titreFilled && categoryFilled) {
      // Activer le style du bouton "Valider"
      submitButton.classList.add("valid");
      submitButton.style.cursor = "pointer";
      submitButton.disabled = false;
    } else {
      // Désactiver le style du bouton "Valider"
      submitButton.classList.remove("valid");
      submitButton.style.cursor = "default";
      submitButton.disabled = true;
    }
  }

  // Écouter les événements de saisie dans les champs du formulaire
  imageUpload.addEventListener("change", checkForm);
  titreInput.addEventListener("input", checkForm);
  categorySelect.addEventListener("change", checkForm);
});
