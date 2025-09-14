// config.js

// === Configuration commune pour semainier et flashcards ===
const config = {
  semaines: {
    "5eme": {
      "1": ["A1", "A1", "A1", "A1"],
      "2": ["A1", "A1", "A1", "A1"]
    },
    "4eme": {
      "1": ["A1", "A1", "A1", "A1"],
      "2": ["A1", "A1", "A1", "A1"]
    }
  },
  flashcards: {
    "5eme": {
      "A": { // Automatismes
        "A1": "Multiplication par 10, 100, 1000",
        "A2": "Multiplication par 0,1 ; 0,01 ; 0,001",
        "A3": "n°3",
        "A4": "n°4"
      },
      "C": { // Questions de cours
        "C1": "Priorités opératoires",
        "C2": "n°2",
        "C3": "n°3"
      }
    },
    "4eme": {
      "A": {
        "A1": "n°1",
        "A2": "n°2"
      },
      "C": {
        "C1": "Egalité de Pythagore (1)",
        "C2": "n°2"
      }
    }
  },
  niveauDefault: "5eme"
};

// === Fonctions utilitaires ===
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
