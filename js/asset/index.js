document.querySelector(".btn-circle").addEventListener("click", async (e) => {
  e.preventDefault();
  const categoria = prompt("Nome da categoria:");

  if (categoria) {
    const res = await fetch(api_url + "/cronus/asset/categoria/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: localStorage.getItem("user"),
      },
      body: JSON.stringify({ label: categoria }),
    });

    if (res.status === 200) {
      alert("Gravado com sucesso.");
    }
  }
});
