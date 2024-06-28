const getMusics = async () => {
  return [
    {
      author: "Ludwig Van Beethoven",
      title:
        "Piano Sonata no. 8 in C minor, op. 13 _Pathetique__ II. Adagio cantabile",
      src: "assets/7.flac",
    },
    {
      author: "Ludwig Van Beethoven",
      title: "02. Bagatelle in A minor, WoO 59 _Fur Elise_",
      src: "assets/2.flac",
    },
  ];
};

const getUserContacts = async () => {
  return [
    {
      id: 0,
      name: "Marcos Oliveira",
      tel: "872081978",
      email: "sairessy@gmail.com",
    },
    { id: 1, name: "Carlos Tembe", tel: "", email: "" },
    { id: 2, name: "Joana Cossa", tel: "", email: "" },
  ];
};

let api_on = false;

async function wakeupAPI() {
  let num_fails = 0;

  while (!api_on && num_fails < 10) {
    try {
      console.log("Waking up the API...");
      const res = await fetch(api_url);
      if (res.status === 200) {
        api_on = true;
        document.getElementById("loader").style.display = "none";
        console.log("Done waking up the API.");
      }
    } catch (error) {
      console.log(error);
      num_fails++;
    }
  }

  if (num_fails >= 10) {
    alert("Erro no servidor.");
  }
}

function setSpeech(text) {
  document.getElementById("speech").innerText = text;
}

function clearResult() {
  document.getElementById("text").innerText = '';
}