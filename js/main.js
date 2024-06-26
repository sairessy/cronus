let listening = false;
let text = "";

let recognition;

window.addEventListener("load", (e) => {
  console.log("Page loaded.");
  wakeupAPI();
  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.start();
  
  document.querySelector('.logo h1').style.color = '#aaa';

  recognition.onresult = (e) => {
    text = e.results[0][0].transcript;
    getIntent(text);
  };

  recognition.onstart = () => {
    console.log("Reconhecimento de voz iniciado...");
  };

  recognition.onend = () => {
    console.log("Ended trying to recognize");
    document.querySelector(".logo h1").style.color = "#aaa";
  };

  recognition.onerror = (err) => {
    console.log(err);
  };

  document.querySelector("body").ondblclick = (e) => {
    document.querySelector(".logo h1").style.color = colors.primary;
  
    listening = false;
  
    recognition.start();
  };
  
  document.getElementById("form-chat").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("inp-text").value;
    getIntent(text);
    document.getElementById("inp-text").value = "";
  });
});

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
