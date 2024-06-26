class Cronus {
  constructor() {
    this.aboutToSendMsg = false;
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = "pt";
    this.speak = (param) => {
      window.speechSynthesis.speak(param);
    };
    this.audio = new Audio("");
    this.audio.id = "audiox";
    this.audio.onended = async () => {
      document.getElementById("text").innerHTML = "";

      const musics = await getMusics();
      const pos = 0;
      const music = musics[pos];

      setTimeout(() => {
        document.getElementById(
          "text"
        ).innerHTML = `Tocando <span>${music.title}</span> de <span>${music.author}</span>`;
        this.audio.play();
      }, 3000);
    };
  }

  async act(data) {
    if (data.intent === "None") {
      this.speech.text = "Desculpa, não entendi.";
      this.speak(this.speech);
      return;
    }

    if (data.intent === "show.time") {
      const time = new Date().toLocaleTimeString("pt");
      this.speech.text = time;
      this.speak(this.speech);
      return;
    }

    if (data.intent === "show.wether") {
      this.speech.text = "Poderei fazer isso em breve!";
      this.speak(this.speech);
      return;
    }

    if (data.intent === "greetings") {
      const greetings = ["Oi", "Olá"];
      this.speech.text =
        greetings[Math.round(Math.random(greetings.length - 1))];
      this.speak(this.speech);
      return;
    }

    if (data.intent === "thanks") {
      this.speech.text = data.answer;
      this.speak(this.speech);
      return;
    }

    if (data.intent === "tell.joke") {
      this.speech.text = "Brevemente serei capaz de contar piadas.";
      this.speak(this.speech);
      return;
    }

    if (data.intent === "play.music") {
      this.speech.text = "Tocando uma música.";
      this.speak(this.speech);
      const musics = await getMusics();
      const pos = 0;
      const music = musics[pos];
      this.audio.src = music.src;
      this.audio.play();
      document.getElementById(
        "text"
      ).innerHTML = `Tocando <span>${music.title}</span> de <span>${music.author}</span>`;
      return;
    }

    if (data.intent === "stop.music") {
      this.speech.text = "Parando a música.";
      this.speak(this.speech);
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
      } catch (error) {
        console.log("Erro ao pausar.");
        console.log(error);
      }
      return;
    }

    if (data.intent === "send.msg") {
      const contacts = await getUserContacts();
      const splited = data.utterance.split(" ");
      const cts = [];

      for (let contact of contacts) {
        for (let s of splited) {
          if (
            contact.name.toLowerCase().includes(s.toLowerCase()) &
            (s.length > 3)
          ) {
            console.log(contact, s);
            cts.push(contact);
          }
        }
      }

      if (cts.length === 0) {
        this.speech.text = "Não tens tal contacto na sua lista.";
        this.speak(this.speech);
      } else {
        console.log(cts);
        this.speech.text = `Caso deseje enviar uma mensagem para ${cts[0].name}, diga a mensagem após o BIP`;
        this.speak(this.speech);

        setTimeout(() => {
          this.aboutToSendMsg = true;
          this.contact = cts[0];
          recognition.start();
        }, 5000);
      }
      return;
    }
  }

  sendMsg(text) {
    const data = { contact: this.contact, text };
    alert(JSON.stringify(data));
  }
}
