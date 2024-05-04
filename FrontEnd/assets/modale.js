const button = document.getElementById("groupedit");
const modal = document.getElementById("modale");
const closemodal = document.getElementById("closemodal");
const contentModal = document.getElementById("contenumodale");

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

contentModal.addEventListener("click", (event) => {
  event.stopPropagation();
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// // TEST CHARGEMENT CATEGORIES
// const worksUrl = "http://localhost:5678/api/works";

// async function callApi(url) {
//   try {
//     const response = await fetch(url);
//     const works = await response.json();
//     afficherElements(works);
//     afficherCategories(works);
//   } catch (error) {
//     console.log("call api error: ", error);
//   }
// }
// callApi(worksUrl);

// function afficherElements(elements) {
//   const gallerymodal = document.querySelector(".gallerymodal");
//   gallerymodal.innerHTML = "";
//   elements.forEach((element) => {
//     const figureElement = document.createElement("figure");
//     const imageElement = document.createElement("img");
//     imageElement.src = element.imageUrl;
//     imageElement.alt = element.title;
//     titleElement.innerText = element.title;
//     figureElement.appendChild(imageElement);
//     figureElement.appendChild(titleElement);
//     gallerymodal.appendChild(figureElement);
//   });
// }
