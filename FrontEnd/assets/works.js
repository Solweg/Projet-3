const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";

async function callApi(url) {
  try {
    console.log("Calling API:", url);
    const response = await fetch(url);
    const works = await response.json();
    showElements(works);
    showCategories(works);
  } catch (error) {
    console.log("call api error: ", error);
  }
}

callApi(worksUrl);

function showElements(elements) {
  console.log("Showing elements");
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

async function getCategories() {
  try {
    console.log("Fetching categories");
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
}

async function showCategories(works) {
  const categories = await getCategories();
  const filtersContainer = document.querySelector(".ContainerFilters");

  filtersContainer.innerHTML = "";
  const buttonTous = document.createElement("button");
  buttonTous.textContent = "Tous";
  buttonTous.onclick = () => {
    console.log("Filter: Tous");
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
      button.addEventListener("click", () => {
        console.log("Filter:", category.name);
        FilterByCategory(works, category.name);
        filtersContainer.querySelectorAll("button").forEach((button) => {
          button.classList.remove("button-active");
        });
        button.classList.add("button-active");
      });
      filtersContainer.appendChild(button);
    });
  }
}

function FilterByCategory(works, categoryName) {
  console.log("Filtering by category:", categoryName);
  const worksFilters = works.filter(
    (work) => work.category.name === categoryName
  );
  showElements(worksFilters);
}
