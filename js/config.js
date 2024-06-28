const api_url =
  window.location.protocol === "https:"
    ? "https://api-master.onrender.com"
    : "http://localhost:8000";

const colors = {
  primary: "#9f34c0",
};

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = false;