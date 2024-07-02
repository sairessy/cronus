async function getStaff() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/staff/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
    <th>Nome</th>
    <th>Area</th>
    <th>Nivel</th>
    <th>Categoria</th>
    <th>Telefone</th>
    <th>Morada</th>
    <th>Acções</th>`

  if (res.status === 200) {
    const data = await res.json();
    console.log(data)
    for (colaborador of data) {
      const { firstName, categoria, tel, nivel, areaFormacao, _id } = colaborador;

      trows += `
        <tr>
          <td>${firstName}</td>
          <td>${areaFormacao && areas.find(({ id }) => id === areaFormacao)?.label}</td>
          <td>${grade_levels.find(({ id }) => id === nivel)?.label}</td>
          <td></td>
          <td>${tel}</td>
          <td></td>
          <td width='20%'>
            <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector('thead').innerHTML = thead;

    document.querySelectorAll(".btn-delete-staff").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        Swal.fire({
          title: "Tem certeza?",
          text: "Esta acção não pode ser desfeita!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, apague!"
        }).then((result) => {
          if (result.isConfirmed) {
            const id = e.target.id;
            Swal.fire({
              title: "Removido",
              text: `${id} foi removido.`,
              icon: "success"
            });
          }
        });
      });
    });
  }
}

getStaff();
