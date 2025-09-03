const niveau = getParam("niveau") || config.niveauDefault;

fetch("fichiers.json")
  .then(res => res.json())
  .then(fichiers => {
    if (!fichiers[niveau]) return;

    const container = document.getElementById("semaine-container");
    const semainesNiveau = config.semaines[niveau];

    Object.keys(semainesNiveau).forEach(sem => {
      const dossiers = semainesNiveau[sem];
      const tousExistants = dossiers.every(d => fichiers[niveau][d] && fichiers[niveau][d].length > 0);

      if (tousExistants) {
        const a = document.createElement("a");
        a.href = `flashcards.html?niveau=${niveau}&sem=${sem}`;
        a.className = `btn btn-5e`;
        a.textContent = `Semaine ${sem}`;
        container.appendChild(a);
      }
    });
  })
  .catch(err => console.error("Erreur chargement fichiers.json :", err));
