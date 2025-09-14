window.initSemainier = function(config, niveau, container) {
  const niveauKey = niveau;
  
  fetch("fichiers.json")
    .then(res => res.json())
    .then(fichiers => {
      if (!fichiers[niveauKey]) return;

      const semainesNiveau = config.semaines[niveauKey];

      Object.keys(semainesNiveau).forEach(sem => {
        const dossiers = semainesNiveau[sem];
        const tousExistants = dossiers.every(d => fichiers[niveauKey][d] && fichiers[niveauKey][d].length > 0);

        if (tousExistants) {
          const a = document.createElement("a");
          a.href = `flashcards.html?niveau=${niveauKey}&sem=${sem}`;
          a.className = `btn btn-${niveauKey === "5eme" ? "5e" : "4e"}`;
          a.textContent = `Semaine ${sem}`;
          container.appendChild(a);
        }
      });
    })
    .catch(err => console.error("Erreur chargement fichiers.json :", err));
};
