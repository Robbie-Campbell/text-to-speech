// The variables for the text to speeck
const button = document.querySelector(".talk");
const content = document.querySelector(".content");

// An array for when the user says hello
const greetings = ["Good afternoon chief", "Hello, good day to you!"];

// Telling javascript what to use for picking up speech
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Creates a constant for speech recognition
const recognition = new SpeechRecognition();

// Listens for the button click and prompts user to speak
recognition.onstart = () => {
  content.textContent = "Speak now...";
};

// Creates a result for the text to speech to understand
recognition.onresult = function(event) {
  // The metadata from the console that reads user speech
  const currentText = event.resultIndex;

  // Reads in the data to be passed into the html
  const transcript = event.results[currentText][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
};

// Tells the html to listen to the users voice
button.addEventListener("click", () => {
  recognition.start();
});

// The function to determine the text to speech
function readOutLoud(message) {
  // The function to create the text to speech
  const speech = new SpeechSynthesisUtterance();

  // Default for when the voice recognition doesn't pick up an instruction
  speech.text = "You need to repeat that";

  // Conditions for the speech output
  if (message.includes("hello")) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  } else if (message.includes("date")) {
    speech.text = Date();
  } else if (message.includes("maths")) {
    speech.text = `The value of pi is ${Math.PI}`;
  }

  // Basic speech settings
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 2;

  // Set the text to speech into the html
  window.speechSynthesis.speak(speech);
}
