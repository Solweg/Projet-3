
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



// Obtient la référence des éléments
const modal = document.getElementById("myModal");
const modifier = document.getElementById("groupedit");
const span = document.getElementsByClassName("close")[0];

// Associe un gestionnaire d'événements pour ouvrir la modal lorsque le bouton est cliqué
btn.onclick = function() {
  modal.style.display = "block";
}

// Associe un gestionnaire d'événements pour fermer la modal lorsque l'utilisateur clique sur la croix
span.onclick = function() {
  modal.style.display = "none";
}

// Associe un gestionnaire d'événements pour fermer la modal lorsque l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}