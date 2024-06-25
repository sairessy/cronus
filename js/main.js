let listening = false;

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

//recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

async function getIntent(text) {
  const res = await fetch(api_url + "/chatbot/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      bot: "cronus",
    },
    body: JSON.stringify({ text }),
  });

  if (res.status === 200) {
    const data = await res.json();
    new Cronus().act(data);
  }
}

document.getElementById("form-chat").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("inp-text").value;
  getIntent(text);
  document.getElementById("inp-text").value = "";
});

let text = "";

recognition.onresult = (e) => {
  text = e.results[0][0].transcript;
  getIntent(text);
};

recognition.onstart = () => {
  console.log("Reconhecimento de voz iniciado...");
};

recognition.onend = () => {
  document.querySelector(".logo h1").style.color = "#ddd";
};

recognition.onerror = (err) => {
  console.log(err);
  alert(err.error);
};

document.querySelector("body").ondblclick = (e) => {
  document.querySelector(".logo h1").style.color = "cornflowerblue";

  listening = false;

  recognition.start();
};

wakeupAPI();

async function wakeupAPI() {
  let api_on = false;

  let num_fails = 0;

  while (!api_on && (num_fails < 10)) {
    try {
      console.log("Try");
      const res = await fetch(api_url);
      if (res.status === 200) {
        api_on = true;
        document.getElementById("loader").style.display = "none";
      }
    } catch (error) {
      console.log(error);
      num_fails++;
    }
  }

  if(num_fails >= 10) {
    alert('Erro no servidor.');
  }
}
