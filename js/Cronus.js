class Cronus {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = "en";
  }

  act(data) {
    if (data.intent === "None") {
      //   alert("I cant understant.");
      this.speech.text = "I cant understant.";
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
      const greet = "Hi!";
      //   alert(greet);
      this.speech.text = greet;
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
