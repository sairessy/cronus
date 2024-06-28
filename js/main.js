const cronus = new Cronus();
let listening = false;
let text = "";

wakeupAPI();

recognition.onresult = (e) => {
  document.querySelector(".logo h1").style.color = "#aaa";
  text = e.results[0][0].transcript;
  if (!cronus.aboutToSendMsg) {
    getIntent(text);
  } else {
    cronus.sendMsg(text);
  }
};

recognition.onstart = () => {
  console.log("Reconhecimento de voz iniciado...");
};

recognition.onend = () => {
  console.log("Ended trying to recognize");
  listening = false;
  document.querySelector(".logo h1").style.color = "#aaa";
  cronus.aboutToSendMsg = false;
};

recognition.onerror = (err) => {
  console.log(err);
  cronus.aboutToSendMsg = false;
  listening = false;
  document.querySelector(".logo h1").style.color = "#aaa";
};

setInterval(() => {
  let condition = !listening && api_on;
  condition = false;

  if (condition) {
    console.log('L &', api_on)
    recognition.start();
    document.querySelector(".logo h1").style.color = colors.primary;
    listening = true;
  }
}, 15000);

document.querySelector("body").ondblclick = (e) => {
  document.querySelector(".logo h1").style.color = colors.primary;

  if (!listening && api_on) {
    recognition.start();
  } else {
    return;
  }

  listening = true;
};

document.getElementById("form-chat").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("inp-text").value;
  getIntent(text);
  document.getElementById("inp-text").value = "";
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
    cronus.act(data);
  }
}
