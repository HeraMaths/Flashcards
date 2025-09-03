function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Récupération du niveau depuis l’URL (pour flashcards) ou depuis le HTML
const niveau = getParam("niveau") || document.querySelector("h1").textContent.split(" ")[0];

fetch("fichiers.json")
  .then(res => res.json())
  .then(fichiers => {
    if (!fichiers[niveau]) return;

    const container = document.getElementById("semaine-container");

    Object.keys(semaines[niveau]).forEach(sem => {
      const dossiers = semaines[niveau][sem];
      const tousExistants = dossiers.every(d => fichiers[niveau][d] && fichiers[niveau][d].length > 0);

      if (tousExistants) {
        const a = document.createElement("a");
        a.href = `flashcards.html?niveau=${niveau}&sem=${sem}`;
        a.className = "btn btn-" + (niveau === "5eme" ? "5e" : "4e");
        a.textContent = `Semaine ${sem}`;
        container.appendChild(a);
      }
    });
  })
  .catch(err => console.error("Erreur chargement fichiers.json :", err));
