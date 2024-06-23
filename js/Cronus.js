class Cronus {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = "pt";
  }

  act(data) {
    if (data.intent === "None") {
      this.speech.text = "Desculpa, não entendi.";
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "show.time") {
      const time = new Date().toLocaleTimeString("en-GB");
      this.speech.text = time;
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "show.wether") {
      this.speech.text = "Poderei fazer isso em breve?";
      window.speechSynthesis.sypeak(this.speech);
      return;
    }

    if (data.intent === "greetings") {
      const greetings = ['Oi', 'Olá'];
      this.speech.text = greetings[Math.round(Math.random(greetings.length - 1))];
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "thanks") {
        this.speech.text = data.answer;
        window.speechSynthesis.speak(this.speech);
        return;
      }
  }
}