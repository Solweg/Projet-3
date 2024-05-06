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

    galleriemodale.appendChild(article);
  });
}

modalWorks();
