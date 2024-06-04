document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");
  const loginlogout = document.getElementById("loginlogout");
  const ContainerFilters = document.getElementById("ContainerFilters");
  const banner = document.getElementById("banner");
  const edit = document.getElementById("groupedit");
  const button = document.getElementById("groupedit");
  const AddImage = document.getElementById("btn-photo");
  const modal = document.getElementById("modal");
  const modal1 = document.getElementById("modal1");
  const categoryIdSelect = document.getElementById("categoryId");
  const modal2 = document.getElementById("modal2");
  const imageUrl = document.getElementById("imageUrl");
  const titleInput = document.getElementById("title");
  const submitButton = document.querySelector('button[type="submit"]');
  const closeModal1 = document.getElementById("closemodal1");
  const closeModal2 = document.getElementById("closemodal2");
  const arrowBack = document.getElementById("arrowback");
  const modalForm = document.getElementById("modalform");

  // Vérification du sessionStorage :
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

  // Fermeture de la modal 1 :

  closeModal1.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Réinitialisation des champs du formulaire dans la modal 2 :
  function resetModalForm() {
    imageUrl.value = null;
    titleInput.value = "";
    categoryIdSelect.value = "";
  }

  closeModal2.addEventListener("click", () => {
    modal.style.display = "none";
    resetModalForm();
  });

  // Prévention de la propagation des événements de clic :

  modal1.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modal2.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Fermeture en cliquant en dehors :
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Affichage de la modale 2 :
  AddImage.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "flex";
  });

  // Affichage de la modale 1 :
  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  button.addEventListener("click", () => {
    modal2.style.display = "none";
    modal1.style.display = "flex";
    modal.style.display = "flex";
  });

  // Retour à la modale 1 :
  arrowBack.addEventListener("click", () => {
    modal1.style.display = "flex";
    modal2.style.display = "none";
  });

  // Insertion de la galerie :
  async function modalWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const gallerymodal = document.getElementById("gallerymodal");

    works.forEach((work) => {
      const article = document.createElement("article");
      article.setAttribute("data-work-id", work.id);
      const img = document.createElement("img");
      img.src = work.imageUrl;
      article.appendChild(img);

      const trashIcon = createTrashIcon(work.id);
      article.appendChild(trashIcon);

      gallerymodal.appendChild(article);
    });
  }

  function updateGallery() {
    window.location.reload();
  }
  modalWorks();

  // fonction pour supprimer le travail correspondant.

  function createTrashIcon(workId) {
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    trashIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      if (confirm("Voulez-vous vraiment supprimer ce projet?")) {
        try {
          await deleteElement(workId);
          const articleToRemove = trashIcon.parentElement;
          articleToRemove.remove();
        } catch (error) {
          console.error("Erreur lors de la suppression", error);
        }
      }
    });
    return trashIcon;
  }

  async function deleteElement(workId) {
    try {
      const token = sessionStorage.getItem("token");

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

  // fetch les catégories dans les options

  function loadCategories() {
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categoryIdSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories :", error);
      });
  }

  loadCategories();

  //  Prévisualisation de l'image :

  imageUrl.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      const imageElement = document.createElement("img");
      imageElement.src = imageURL;
      imageElement.alt = "Image miniature";

      const pictureform = document.querySelector(".picture-form");
      pictureform.innerHTML = "";
      // Effacer le contenu existant
      pictureform.appendChild(imageElement);

      imageElement.onload = function () {
        URL.revokeObjectURL(imageURL);
      };
    }
  });

  function checkForm() {
    const imageFilled = imageUrl.files.length > 0;
    const titleFilled = titleInput.value.trim() !== "";
    const categoryFilled = categoryIdSelect.value !== "";

    // Vérifier si tous les champs sont remplis
    if (imageFilled && titleFilled && categoryFilled) {
      submitButton.classList.add("valid");
      submitButton.style.cursor = "pointer";
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove("valid");
      submitButton.style.cursor = "default";
      submitButton.disabled = true;
    }
  }

  imageUrl.addEventListener("input", checkForm);
  titleInput.addEventListener("input", checkForm);
  categoryIdSelect.addEventListener("change", checkForm);

  // Écouteur d'événement pour le formulaire
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    const endPoint = "http://localhost:5678/api/works";
    const formData = new FormData();

    formData.append("image", imageUrl.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryIdSelect.value);

    console.log(formData);

    fetch(endPoint, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Photo envoyée avec succès");
          resetModalForm();

          window.alert("Photo ajoutée à la galerie !");
        } else {
          console.error("Échec de l'envoi de la photo");
          window.alert("Veuillez renseigner tous les champs.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
      });
  });
});
