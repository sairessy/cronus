const nav = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "",
    icon: "chart-pie-solid",
    show: true,
  },
  {
    id: "staff",
    name: "Colaboradores",
    path: "pages/staff",
    icon: "male-solid",
    show: true,
  },
  {
    id: "asset",
    name: "Activos",
    path: "pages/asset",
    icon: "couch-solid",
    show: true,
  },

  {
    id: "stock",
    name: "Inventário",
    path: "pages/stock",
    icon: "docker",
    show: true,
  },
  {
    id: "sales",
    name: "POS",
    path: "pages/sales",
    icon: "store-alt-solid",
    show: false,
  },
  {
    id: "accounting",
    name: "Contabilidade",
    path: "pages/accounting",
    icon: "credit-card",
    show: true,
  },

  {
    id: "credito",
    name: "Microcédito",
    path: "pages/credito",
    icon: "coins-solid",
    show: true,
  },
];

let n = "";

for (let elt of nav) {
  const { id, name, path, icon, show } = elt;
  const active = window.location.href.includes(id);
  if (show) {
    const color = active ? colors.primary : "auto;";
    n += `
    <a href='${base_url}/${path}' 
      style='background-color: ${color};color: ${active ? "#fff" : "auto"};'
    >
      <img width='20' height='20' src='${base_url}/assets/img/nav/${icon}.svg' />
      <span>${name}</span>
    </a>`;
  }
}

document.getElementById("suggestions").innerHTML = n;

if (window.location.href === window.location.origin + "/") {
  document.querySelector("#suggestions a").style.backgroundColor =
    colors.primary;
  document.querySelector("#suggestions a").style.color = "#fff";
}

document.getElementById("a-dashboard").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});
