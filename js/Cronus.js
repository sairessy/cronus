class Cronus {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = "en";
  }

  act(data) {
    if (data.intent === "None") {
      //   alert("I cant understant.");
      this.speech.text = "Sorry, i cant understant.";
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "show.time") {
      const time = new Date().toLocaleTimeString("en-GB");
      //   alert(time);
      this.speech.text = time;
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "show.wether") {
      this.speech.text = "I cant do it now?";
      window.speechSynthesis.speak(this.speech);
      return;
    }

    if (data.intent === "greetings") {
      const greetings = ['Hello', 'Hi'];
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
