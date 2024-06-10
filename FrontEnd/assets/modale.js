document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded: script started");

  const token = sessionStorage.getItem("token");
  const loginlogout = document.getElementById("loginlogout");
  const ContainerFilters = document.getElementById("ContainerFilters");
  const banner = document.getElementById("banner");
  const edit = document.getElementById("groupedit");
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

  if (token) {
    console.log("Token found");
    loginlogout.textContent = "logout";
    ContainerFilters.style.display = "none";
    banner.style.display = "block";
    edit.style.display = "block";

    loginlogout.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Logging out");
      sessionStorage.clear();
      window.location.reload();
    });
  } else {
    console.log("No token found");
    banner.style.display = "none";
    edit.style.display = "none";
  }

  closeModal1.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Closing modal 1");
    modal.style.display = "none";
  });

  function resetModalForm() {
    console.log("Resetting modal form");
    imageUrl.value = null;
    titleInput.value = "";
    categoryIdSelect.value = "";
  }

  closeModal2.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Closing modal 2");
    modal2.style.display = "none";
    resetModalForm();
  });

  modal1.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Clicked inside modal1");
  });

  modal2.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Clicked inside modal2");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      console.log("Clicked outside modal, closing modal");
      modal.style.display = "none";
    }
  });

  AddImage.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Opening modal 2");
    modal1.style.display = "none";
    modal2.style.display = "flex";
    console.log("modal1 display: none");
    console.log("modal2 display: flex");
  });

  edit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Opening modal 1");
    modal.style.display = "flex";
    modal1.style.display = "flex";
    modal2.style.display = "none";
    console.log("modal display: flex");
    console.log("modal1 display: flex");
    console.log("modal2 display: none");
  });

  arrowBack.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Returning to modal 1 from modal 2");
    modal1.style.display = "flex";
    modal2.style.display = "none";
    console.log("modal1 display: flex");
    console.log("modal2 display: none");
  });

  async function modalWorks() {
    try {
      console.log("Fetching works");
      const response = await fetch("http://localhost:5678/api/works");
      const works = await response.json();
      const gallerymodal = document.getElementById("gallerymodal");

      gallerymodal.innerHTML = "";

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

      console.log("Gallery modal updated with works");
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  }

  modalWorks();

  function createTrashIcon(workId) {
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    trashIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log(`Attempting to delete work with ID: ${workId}`);
      if (confirm("Voulez-vous vraiment supprimer ce projet?")) {
        try {
          await deleteElement(workId);
          console.log(`Work with ID: ${workId} deleted`);
          modalWorks();
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
        console.log("No token found, cannot delete element");
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
        console.error("Failed to delete work", response.status);
      }
    } catch (error) {
      console.error("Error deleting element", error);
    }
  }

  const categoriesUrl = "http://localhost:5678/api/categories";
  function loadCategories() {
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categoryIdSelect.appendChild(option);
          console.log(`Loaded category: ${category.name}`);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories :", error);
      });
  }

  loadCategories();

  imageUrl.addEventListener("change", function (event) {
    const file = event.target.files[0];
    console.log("Image file selected");

    if (file) {
      const imageURL = URL.createObjectURL(file);
      const imageElement = document.createElement("img");
      imageElement.src = imageURL;
      imageElement.alt = "Image miniature";

      const pictureform = document.querySelector(".picture-form");
      pictureform.innerHTML = "";
      pictureform.appendChild(imageElement);
      imageElement.onload = function () {
        URL.revokeObjectURL(imageURL);
      };

      console.log("Image preview updated");
    }
  });

  function checkForm() {
    const imageFilled = imageUrl.files.length > 0;
    const titleFilled = titleInput.value.trim() !== "";
    const categoryFilled = categoryIdSelect.value !== "";

    if (imageFilled && titleFilled && categoryFilled) {
      submitButton.classList.add("valid");
      submitButton.style.cursor = "pointer";
      submitButton.disabled = false;
      console.log("Form is valid");
    } else {
      submitButton.classList.remove("valid");
      submitButton.style.cursor = "default";
      submitButton.disabled = true;
      console.log("Form is invalid");
    }
  }

  imageUrl.addEventListener("input", checkForm);
  titleInput.addEventListener("input", checkForm);
  categoryIdSelect.addEventListener("change", checkForm);

  modalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");

    const endPoint = "http://localhost:5678/api/works";
    const formData = new FormData();

    formData.append("image", imageUrl.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryIdSelect.value);

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
          modal2.style.display = "none";
          modal1.style.display = "flex";
          console.log("modal2 display: none");
          console.log("modal1 display: flex");
          modalWorks();
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
