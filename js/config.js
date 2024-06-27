const api_url =
  window.location.protocol === "https:"
    ? "https://api-master.onrender.com"
    : "http://localhost:8000";

const colors = {
  primary: "#c7383f",
};

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = false;