// const api_url = "http://localhost:8000";
const api_url = "https://api-master.onrender.com";

const colors = {
  primary: "#c7383f",
};

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = false;