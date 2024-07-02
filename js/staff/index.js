async function getStaff() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/staff/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    for (colaborador of data) {
      const { firstName, categoria, tel, nivel, areaFormacao, _id } = colaborador;
      trows += `
        <tr>
          <td>${firstName}</td>
          <td>${areas.find(({ id }) => id === areaFormacao).label}</td>
          <td>${grade_levels.find(({ id }) => id === nivel).label}</td>
          <td></td>
          <td>${tel}</td>
          <td></td>
          <td width='20%'>
            <a href="./staff/edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"></button>
          </td>
        </tr>
      `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelectorAll(".btn-delete-staff").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        alert(e.target.id);
      });
    });
  }
}

getStaff();
