function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const niveau = getParam("niveau") || config.niveauDefault;
const type = getParam("type");
const semaine = getParam("sem");

fetch("fichiers.json")
  .then(res => res.json())
  .then(fichiers => {
    if (!fichiers[niveau]) return;

    const container = document.getElementById("cards");
    let questionsToShow = [];

    if (type) {
      // Sections "questions de cours" ou "automatismes"
      if (!fichiers[niveau][type]) return;
      questionsToShow = pickRandom(fichiers[niveau][type], Math.min(4, fichiers[niveau][type].length));
    } else if (semaine) {
      // Semainier : une question par dossier
      if (!config.semaines[niveau] || !config.semaines[niveau][semaine]) return;
      const dossiers = config.semaines[niveau][semaine];
      dossiers.forEach(d => {
        if (fichiers[niveau][d] && fichiers[niveau][d].length > 0) {
          const q = pickRandom(fichiers[niveau][d], 1)[0];
          questionsToShow.push({ dossier: d, q });
        }
      });
    } else {
      return;
    }

    questionsToShow.forEach(item => {
      let q, dossier;
      if (typeof item === "string") {
        q = item;
        dossier = type;
      } else {
        q = item.q;
        dossier = item.dossier;
      }

      console.log("Chemin d'accès :", `${niveau}/${dossier}/`, "Question :", q);


      const r = q.replace(/^q_/, "r_");
      const folder = `${niveau}/${dossier}/`;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-inner">
          <div class="face front"><img src="${folder}${q}" alt="Question"></div>
          <div class="face back"><img src="${folder}${r}" alt="Réponse"></div>
        </div>
      `;
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Erreur chargement fichiers.json :", err));

// Réinitialiser toutes les cartes
document.getElementById('reset-cards').addEventListener('click', () => {
  document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
});

// Nouvelles cartes = recharge la page
document.getElementById('new-cards').addEventListener('click', () => {
  window.location.reload();
});
