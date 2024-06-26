const cronus = new Cronus();
let listening = false;
let text = "";

wakeupAPI();


document.querySelector("body").ondblclick = (e) => {
  document.querySelector(".logo h1").style.color = colors.primary;

  listening = false;

  recognition.start();

  recognition.onresult = (e) => {
    text = e.results[0][0].transcript;
    if(!cronus.aboutToSendMsg) {
      getIntent(text);
    } else {
      cronus.sendMsg();
    }
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
