const api_url =
  window.location.protocol === "https:"
    ? "https://api-master.onrender.com"
    : "http://localhost:8000";

// For test on github host /cronus
const base_url =
  window.location.protocol === "https:"
    ? "https://sairessy.github.io/cronus"
    : "http://localhost:3000";

const colors = {
  primary: "#6495ed",
};

const grade_levels = [
  { id: "0", label: "Basico" },
  { id: "1", label: "Medio" },
  { id: "2", label: "Bacharel" },
  { id: "3", label: "Licenciado" },
  { id: "4", label: "Mestre" },
  { id: "5", label: "PhD" },
];

const areas = [
  { id: "0", label: "Engenharia" },
  { id: "1", label: "Administração & Gestão" },
  { id: "2", label: "Economia e finaças" },
  { id: "3", label: "Contabilidade e Auditoria" },
  { id: "4", label: "Direito" },
  { id: "5", label: "Saúde" },
  { id: "-1", label: "Outro" },
];

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
