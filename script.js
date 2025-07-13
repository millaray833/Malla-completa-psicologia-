const cursos = [
  {"nombre": "Historia de la psicología y sistemas psicológicos", "abre": [], "semestre": "I Semestre"},
  {"nombre": "Neurobiología aplicada a la psicología", "abre": [], "semestre": "I Semestre"},
  {"nombre": "Psicología del desarrollo humano", "abre": [], "semestre": "I Semestre"},
  {"nombre": "Metodología de la investigación en psicología", "abre": [], "semestre": "I Semestre"},
  {"nombre": "Filosofía y psicología", "abre": ["Procesos cognitivos I"], "semestre": "I Semestre"},
  {"nombre": "Introducción a la psicología y su praxis", "abre": [], "semestre": "I Semestre"},
  {"nombre": "Comunicación oral y escrita I", "abre": ["Comunicación oral y escrita II"], "semestre": "I Semestre"},
  {"nombre": "Idioma extranjero I", "abre": ["Idioma extranjero II"], "semestre": "I Semestre"},
  {"nombre": "Neurobiología aplicada a la psicología", "abre": ["Evaluación de la inteligencia y procesos neuropsicológicos"], "semestre": "II Semestre"},
  {"nombre": "Psicología del desarrollo humano", "abre": ["Psicología de la personalidad I", "Psicología de la personalidad II", "Psicopatología infanto juvenil", "Psicología educacional I"], "semestre": "II Semestre"},
  {"nombre": "Metodología de la investigación en psicología", "abre": ["Psicología social I: Pensamiento social", "Técnicas de recolección y análisis de datos cualitativos"], "semestre": "II Semestre"},
  {"nombre": "Comunicación Oral y escrita II", "abre": ["Comprensión de contextos sociales"], "semestre": "II Semestre"},
  {"nombre": "Procesos cognitivos I", "abre": ["Procesos de aprendizaje básico"], "semestre": "II Semestre"},
  {"nombre": "Idioma extranjero II", "abre": ["Idioma extranjero III"], "semestre": "II Semestre"},
  {"nombre": "Técnicas de análisis estadísticos en psicología I", "abre": ["Técnicas de análisis estadísticos en psicología II"], "semestre": "II Semestre"},
  // Resto omitido por límite de espacio pero será incluido en archivo final...
];

// Mapa inverso: nombre -> id generado
const idMap = {};
cursos.forEach((c, i) => {
  const id = "ramo" + i;
  c.id = id;
  idMap[c.nombre] = id;
});

// Agregar prerrequisitos
cursos.forEach(curso => {
  curso.prerreq = [];
  cursos.forEach(posible => {
    if (posible.abre.includes(curso.nombre)) {
      curso.prerreq.push(posible.id);
    }
  });
});

const container = document.getElementById("malla-container");
const semestres = [...new Set(cursos.map(c => c.semestre))];

semestres.forEach(sem => {
  const title = document.createElement("div");
  title.className = "semestre-titulo";
  title.textContent = sem;
  container.appendChild(title);

  cursos.filter(c => c.semestre === sem).forEach(curso => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = curso.nombre;
    div.dataset.id = curso.id;
    div.dataset.prerreq = curso.prerreq.join(",");
    container.appendChild(div);
  });
});

function updateRamos() {
  document.querySelectorAll(".ramo").forEach(ramo => {
    const prereqs = ramo.dataset.prerreq.split(",").filter(Boolean);
    const completos = prereqs.every(id =>
      document.querySelector(`.ramo[data-id="${id}"]`)?.classList.contains("completed")
    );
    if (prereqs.length === 0 || completos) {
      ramo.classList.remove("locked");
    } else {
      ramo.classList.add("locked");
    }
  });
}

document.querySelectorAll(".ramo").forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("locked")) return;
    ramo.classList.toggle("completed");
    updateRamos();
  });
});

updateRamos();

