getAsset();
async function getAsset() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/asset/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
    <th>Nome</th>
    <th>Valor</th>
    <th>Acções</th>
  `;

  if (res.status === 200) {
    const data = (await res.json()).filter(({desc}) => desc);
    console.log(data);
    for (asset of data) {
      const {
        desc, valor,
        _id,
      } = asset;

      trows += `
          <tr>
            <td>${desc}</td>
            <td>${valor}</td>
            <td width='20%'>
              <a href="edit.html?id=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
              <button class="btn-circle btn-circle-delete btn-delete-asset" id="${_id}"><i class='la la-trash'></i></button>
            </td>
          </tr>
        `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    document.querySelectorAll(".btn-delete-asset").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        Swal.fire({
          title: "Tem certeza?",
          text: "Esta acção não pode ser desfeita!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, apague!",
        }).then((result) => {
          if (result.isConfirmed) {
            const id = e.target.id;
            Swal.fire({
              title: "Removido",
              text: `${id} foi removido.`,
              icon: "success",
            });
          }
        });
      });
    });
  }
}
