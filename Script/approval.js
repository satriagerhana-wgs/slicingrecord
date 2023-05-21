// SCRIPT AUDIO
const audio = document.getElementById("myAudio");
const playPauseButton = document.getElementById("playPauseButton");
const imageElement = document.getElementById("imageElement");

const record = document.getElementById("AudioNasabah");
const playPauseRecord = document.getElementById("playPauseRecord");
const imageElementnasabah = document.getElementById("imageElementnasabah");
const btnKonfirmasi = document.getElementById("btnKonfirmasi");
const btnSimpanRekam = document.getElementById("btnSimpanRekam");
const popUpRecord = document.getElementById("popUpRecord");
const popUpTimeOut = document.getElementById("popUpTimeOut");
const btnYaTimeOut = document.getElementById("btnYaTimeOut");
const popUpUlangRecord = document.getElementById("popUpUlangRecord");
let countdownSeconds = 30;
let countdownInterval;

btnKonfirmasi.addEventListener("click", () => {
  if (
    btnRekamUlang.addEventListener("click", () => {
      popUpRecord.style.display = "block";
      countdown();
    })
  ) {
  }
  if (
    btnSimpanRekam.addEventListener("click", () => {
      window.location = "/EndPage.html";
    })
  ) {
  }
});

playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    imageElement.src = "/Assets/icon-pause-wav.svg";
  } else {
    audio.pause();
    imageElement.src = "/Assets/icon-play-wav.svg";
  }
});

playPauseRecord.addEventListener("click", () => {
  if (record.paused) {
    record.play();
    imageElementnasabah.src = "/Assets/icon-pause-wav.svg";
  } else {
    record.pause();
    imageElementnasabah.src = "/Assets/icon-play-wav.svg";
  }
});

const result = localStorage.getItem("result");
const resultRecord = document.getElementById("resultRecord");
const recordHasilNasabah = document.getElementById("recordHasilNasabah");
const elementIndikator = document.getElementById("elementIndikator");
const btnRekamUlang = document.getElementById("btnRekamUlang");
resultRecord.textContent = result;

if (
  result === "ya saya paham dan saya setuju" ||
  result === "iya saya paham dan saya setuju" ||
  result === "ya saya paham saya setuju" ||
  result === "ya saya mengerti dan saya setuju" ||
  result === "Ya saya mengerti dan saya setuju" ||
  result === "ya saya mengerti dan setuju" ||
  result === "iya saya mengerti dan saya setuju" ||
  result === "ya saya mengerti dan setuju" ||
  result === "iya saya mengerti dan setuju" ||
  result === "iya saya paham saya setuju" ||
  result === "ya saya setuju" ||
  result === "iya saya setuju" ||
  result === "iya setuju" ||
  result === "ya setuju" ||
  result === "setuju" ||
  result === "saya setuju"
) {
  recordHasilNasabah.style.border = "2px solid #00a758";
  resultRecord.style.color = "#00a758";
  btnRekamUlang.style.display = "none";
} else {
  recordHasilNasabah.style.border = "2px solid #ff2622";
  resultRecord.style.color = "#ff2622";
  playPauseRecord.style.backgroundColor = "#ff2622";
  elementIndikator.src = "/Assets/button-error.svg";
}

// SCRIPT POP UP RECORD
const recordBtn = document.getElementById("recordBtn");
const transcript = document.getElementById("transcript");
const closePopupBtnRecord = document.getElementById("closePopupBtnRecord");

let recognition;

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.lang = "id-ID";

  recognition.onresult = (event) => {
    const { transcript: result } = event.results[0][0];
    transcript.textContent = `\" ${result} \"`;
    localStorage.setItem("result", result);
    console.log(result);
    if (
      result === "ya saya paham dan saya setuju" ||
      result === "iya saya paham dan saya setuju" ||
      result === "ya saya paham saya setuju" ||
      result === "ya saya mengerti dan saya setuju" ||
      result === "Ya saya mengerti dan saya setuju" ||
      result === "ya saya mengerti dan setuju" ||
      result === "iya saya mengerti dan saya setuju" ||
      result === "ya saya mengerti dan setuju" ||
      result === "iya saya mengerti dan setuju" ||
      result === "iya saya paham saya setuju" ||
      result === "ya saya setuju" ||
      result === "iya saya setuju" ||
      result === "iya setuju" ||
      result === "ya setuju" ||
      result === "setuju" ||
      result === "saya setuju"
    ) {
      transcript.style.color = "#00A758";
    } else {
      transcript.style.color = "#F94C4C";
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recordBtn.addEventListener("click", () => {
    recognition.start();
    clearTimeout(countdownInterval);
    console.log("Countdown dihentikan!");
    imageElementRecord.src = "/Assets/icon-stop-record.svg";
    recordBtn.addEventListener("click", () => {
      recognition.stop();
      imageElementRecord.src = "/Assets/icon-record-nasabah-disable.svg";
    });
  });
} else {
  recordBtn.disabled = true;
  recordBtn.textContent = "Speech Recognition Not Supported";
}

closePopupBtnRecord.addEventListener("click", () => {
  popUpRecord.style.display = "none";
  location.reload();
});

ulangBtn.addEventListener("click", () => {
  popUpUlangRecord.style.display = "block";
  popUpRecord.style.display = "none";

  if (
    btnTidakUlang.addEventListener("click", () => {
      popUpRecord.style.display = "block";
      popUpReplay.style.display = "none";
    })
  ) {
  }
  if (
    btnYaUlang.addEventListener("click", () => {
      window.location = "/Approval.html";
    })
  ) {
  } else {
  }
});

selesaiBtn.addEventListener("click", () => {
  window.location = "/Approval.html";
});

// FUNCTION TIME
function countdown() {
  var timerElement = document.getElementById("timer");
  timerElement.textContent = pad(countdownSeconds);

  if (countdownSeconds <= 0) {
    clearTimeout(countdownInterval);
    console.log("Waktu telah habis!");
    popUpRecord.style.display = "none";
    popUpTimeOut.style.display = "block";
    if (
      btnYaTimeOut.addEventListener("click", () => {
        window.location = "/Approval.html";
      })
    ) {
    }
  } else {
    countdownSeconds--;
    countdownInterval = setTimeout(countdown, 1000);
  }
}

function pad(value) {
  return String(value).padStart(5, "00:00");
}
