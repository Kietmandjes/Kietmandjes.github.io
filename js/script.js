const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const message = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
  if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
    let recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL'; // which language is used?
    recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
    recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   
    recognition.onstart = () => {
      message.innerHTML = `Starting listening, speak in the microphone please<br>Say "help me" for help`;
      output.classList.add("hide"); // hide the output
    };

    recognition.onspeechend = () => {
      message.innerHTML = `Ik ben gestopt met luisteren `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
      let transcript = result.results[0][0].transcript;
      let confidenceTranscript= Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
      output.classList.remove("hide"); // show the output
      output.innerHTML = `Ik ben ${confidenceTranscript}% zeker dat je zei: <b>${transcript}</b>`;
      actionSpeech(transcript);
    };

    recognition.start();
  } 
  else {  // speechrecognition is not supported
    message.innerHTML = "sorry speech to text is not supported in this browser";
  }
};

// process speech results
actionSpeech = (speechText) => {
  speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
  console.log(speechText); // debug 
  switch(speechText){ 
    // switch evaluates using stric comparison, ===
    case "paars":
      document.body.style.background = "purple";
      document.body.style.color="#FFFFFF";
      break;
    case  "reset":
      document.body.style.background = "#ffe6ab";
      document.body.style.color="#000000";
      image1.classList.add("hide"); // hide image (if any)
      break;
    case "foto": // let op, "fall-through"
    case "jeroen": // let op, "fall-through"
      image1.src = "./img/jeroen.jfif";
      image1.style.width = "400px";
      image1.classList.remove("hide") // show image
      break;
      case "iphone": // let op, "fall-through"
      image1.src = "./img/iphone.jfif";
      image1.style.width = "400px";
      image1.classList.remove("hide") // show image
      break;
    case "kiet":
      window.open("https://github.com/Kietmandjes",);
      break;
    case "help me":
      alert("Valid speech commands: paars,  reset, foto, jeroen, iphone, kiet, shirt.");
      break;
    case "shirt":
      window.open("https://www.debijenkorf.nl/prada-fijngebreid-t-shirt-in-kasjmierblend-met-logo-9842070033-984207003312046?query=fh_location%3D%252F%252Fcatalog01%252Fnl_NL%252Fcategories%253C%257Bcatalog01_80%257D%252Fcategories%253C%257Bcatalog01_80_890%257D%252Fcategories%253C%257Bcatalog01_80_890_4470%257D%252Fcategories%253C%257Bcatalog01_80_890_4470_4540%257D%252Fprijs_na_korting_nl%253E1200.0%26country%3DNL%26chl%3D1%26language%3Dnl",);
      break;
    default:
      window.open("https://www.google.com/search?q=" + speechText,);
      break;
      // do nothing yet
  }
}