class Cronus {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = "pt";
    this.speak = (param) => {
      window.speechSynthesis.speak(param);
    };
  }

  act(data) {
    if (data.intent === "None") {
      this.speech.text = "Desculpa, não entendi.";
      this.speak(this.speech);
      return;
    }

    if (data.intent === "show.time") {
      const time = new Date().toLocaleTimeString('pt');
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
      this.speech.text = "Brevemente serei capaz de tocar músicas.";
      this.speak(this.speech);
      return;
    }
  }
}
