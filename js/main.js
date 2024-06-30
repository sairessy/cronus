let api_on = false;

wakeupAPI();

const nav = [
  {
    id: "dashboard",
    name: "Dashboard",
    url: "",
    icon: "chart-pie-solid",
    show: true,
  },
  {
    id: "staff",
    name: "Funcionários",
    url: "pages/staff",
    icon: "male-solid",
    show: true,
  },
  {
    id: "stock",
    name: "Stock",
    url: "pages/stock",
    icon: "docker",
    show: true,
  },
  {
    id: "credito",
    name: "Microcédito",
    url: "pages/credito",
    icon: "coins-solid",
    show: true,
  },
  {
    id: "asset",
    name: "Activos & Passivos",
    url: "pages/asset",
    icon: "couch-solid",
    show: true,
  },
  {
    id: "sales",
    name: "Vendas",
    url: "pages/sales",
    icon: "store-alt-solid",
    show: true,
  },
];

let n = "";

let hasOneActive = false;

for (let elt of nav) {
  const { id, name, url, icon, show } = elt;
  const active = window.location.href.includes(id);
  hasOneActive = active;
  if (show) {
    n += `
    <a href='${window.location.origin}/${url}' 
      style='border: ${active ? '1px solid #9f34c0' : 'auto'};'
    >
      <img width='20' height='20' src='${window.location.origin}/assets/img/nav/${icon}.svg' />
      <span>${name}</span>
    </a>`;
  }
}

document.getElementById("suggestions").innerHTML = n;

if(window.location.href === window.location.origin + '/') {
  document.querySelector('#suggestions a').style.border = `1px solid ${colors.primary}`;
}

document.getElementById('a-dashboard').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
})
