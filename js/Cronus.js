class Cronus {
  constructor() {
    this.aboutToSendMsg = false;
    this.listening = false;
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
    clearResult();
    if (data.intent === "None") {
      this.speech.text = "Desculpa, não entendi.";
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "show.time") {
      const time = new Date().toLocaleTimeString("pt");
      this.speech.text = time;
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "show.wether") {
      this.speech.text = "Poderei fazer isso em breve!";
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "greetings") {
      const greetings = ["Oi", "Olá"];
      this.speech.text =
        greetings[Math.round(Math.random(greetings.length - 1))];
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "thanks") {
      this.speech.text = data.answer;
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "tell.joke") {
      this.speech.text = "Brevemente serei capaz de contar anedotas.";
      setSpeech(this.speech.text);
      this.speak(this.speech);
      return;
    }

    if (data.intent === "play.music") {
      if (!this.audio.paused) {
        this.speech.text = "Tocando outra música.";
      } else {
        this.speech.text = "Tocando uma música.";
      }

      setSpeech(this.speech.text);
      this.speak(this.speech);
      const musics = await getMusics();
      const pos = Math.round(Math.random() * (musics.length - 1));
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
      setSpeech(this.speech.text);
      this.speak(this.speech);
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
        document.getElementById("text").innerHTML = "";
      } catch (error) {
        console.log("Erro ao pausar.");
        console.log(error);
      }
      return;
    }

    if (data.intent === "rent.house") {
      if (data.houses.length !== 0) {
        this.speech.text = `Abaixo a lista de casas.`;
        setSpeech(this.speech.text);
        this.speak(this.speech);
        let tecnicos = new String();
        for (let house of data.houses) {
          tecnicos += `<p><a href='tel:+258${house.tel}'>(+258) ${house.tel}</a> Bairro: ${house.bairro} Quartos: ${
            house.quartos
          } Garragem: ${house.garagem > 0 ? "Sim" : "Não"}</p>`;
        }
        document.getElementById("text").innerHTML = tecnicos;
      }
    }

    if ((data.intent = "find.technician")) {
      this.speech.text = `Ainda não tenho um técnico de ${data.tech_area.label} registado.`;

      if (!data.tech_area) {
        this.speech.text = `Não tenho técnicos dessa area.`;
      }

      if (data.techs.length !== 0) {
        this.speech.text = `Abaixo a lista dos técnicos de ${data.tech_area.label}.`;
        let tecnicos = new String();
        for (let tecnico of data.techs) {
          tecnicos += `<a href='tel:${tecnico.tel}'><p>${tecnico.name} (${tecnico.bairro})</p></a>`;
        }
        document.getElementById("text").innerHTML = tecnicos;
      }

      setSpeech(this.speech.text);
      this.speak(this.speech);
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
        setSpeech(this.speech.text);
        this.speak(this.speech);
      } else {
        console.log(cts);
        this.speech.text = `Caso deseje enviar uma mensagem para ${cts[0].name}, diga a mensagem após o BIP`;
        this.speak(this.speech);

        listening = true;

        setTimeout(() => {
          this.aboutToSendMsg = true;
          this.contact = cts[0];
          recognition.start();
          listening = false;
        }, 15000);
      }
      return;
    }
  }

  async sendMsg(text) {
    const data = { contact: this.contact, text };
    this.speech.text = `Enviei uma mensagem a ${data.contact.name}' com o conteudo: ${data.text}`;
    setSpeech(this.speech.text);
    this.speak(this.speech);
    const res = await fetch(api_url + "/chatbot/send-msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: "Sairesse",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const d = await res.json();
      console.log(d);
    }
  }
}
