document.addEventListener("DOMContentLoaded", () => {
  const loginlogout = document.getElementById("loginlogout");
  const ContainerFilters = document.getElementById("ContainerFilters");
  const banner = document.getElementById("banner");
  const edit = document.getElementById("groupedit");
  const button = document.getElementById("groupedit");
  const AjouterPhoto = document.getElementById("btn-photo");
  const modal = document.getElementById("modal");
  const modal1 = document.getElementById("modal1");
  const categorySelect = document.getElementById("category");
  const modal2 = document.getElementById("modal2");
  const imageUpload = document.getElementById("imageUpload");
  const titleInput = document.getElementById("Title");
  const submitButton = document.querySelector('button[type="submit"]');
  const closeModal1 = document.getElementById("closemodal1");
  const closeModal2 = document.getElementById("closemodal2");
  const arrowBack = document.getElementById("arrowback");

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

  // Réinitialiser les champs du formulaire de la modal 1
  closeModal1.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function resetModalForm() {
    imageUpload.value = null;
    titleInput.value = "";
    categorySelect.value = "";
  }

  closeModal2.addEventListener("click", () => {
    modal.style.display = "none";
    resetModalForm();
  });

  modal1.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modal2.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  AjouterPhoto.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "flex";
  });

  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  button.addEventListener("click", () => {
    // Assurez-vous que la modal 2 est cachée
    modal2.style.display = "none";
    // Affichez la modal 1
    modal1.style.display = "flex";
    // Affichez la modale principale
    modal.style.display = "flex";
  });

  arrowBack.addEventListener("click", () => {
    // Afficher la modal 1 et cacher la modal 2
    modal1.style.display = "flex";
    modal2.style.display = "none";
  });

  // Insertion de la galerie
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

  // fetch les catégories dans les options

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

  function checkForm() {
    const imageFilled = imageUpload.files.length > 0;
    const titleFilled = titleInput.value.trim() !== "";
    const categoryFilled = categorySelect.value !== "";

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

  // Écouter les événements de saisie
  imageUpload.addEventListener("change", checkForm);
  titleInput.addEventListener("input", checkForm);
  categorySelect.addEventListener("change", checkForm);

  // Initialiser le bonton
  checkForm();
});
