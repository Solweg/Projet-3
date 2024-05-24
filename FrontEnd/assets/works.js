// Définition des adresses:

const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";

// Fonction asynchrone d'appel de l'API:

async function callApi(url) {
  try {
    const response = await fetch(url);
    const works = await response.json();
    showElements(works);
    showCategories(works);
  } catch (error) {
    console.log("call api error: ", error);
  }
}

callApi(worksUrl);

//Affichage des élèments par catégories:

function showElements(elements) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  elements.forEach((element) => {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = element.imageUrl;
    imageElement.alt = element.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = element.title;
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
    gallery.appendChild(figureElement);
  });
}

// Requête HTTP GET vers l'URL des catégories:

async function getCategories() {
  try {
    const response = await fetch(categoriesUrl);
    // retourne les données au format JSON:
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
}

// Affichage des catégories,

async function showCategories(works) {
  const categories = await getCategories();
  const filtersContainer = document.querySelector(".ContainerFilters");
  // réation du filtre "tous":
  filtersContainer.innerHTML = "";
  const buttonTous = document.createElement("button");
  buttonTous.textContent = "Tous";
  buttonTous.onclick = () => {
    showElements(works);
    filtersContainer.querySelectorAll("button").forEach((button) => {
      button.classList.remove("button-active");
    });
    buttonTous.classList.add("button-active");
  };
  filtersContainer.appendChild(buttonTous);
  if (categories) {
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      filtersContainer.appendChild(button);
      button.addEventListener("click", async function () {
        FilterByCategory(works, category.name);
        filtersContainer.querySelectorAll("button").forEach((button) => {
          button.classList.remove("button-active");
        });
        button.classList.add("button-active");
      });
    });
  }
}

// Fonction qui filtre les projets:

function FilterByCategory(works, categoryName) {
  const worksFilters = works.filter(
    (work) => work.category.name === categoryName
  );
  showElements(worksFilters);
}
