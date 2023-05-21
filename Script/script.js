// START SCRIPT POP UP MENDENGARKAN REKAMAN
const dengarkanScript = document.getElementById("dengarkanScript");
const mulaiRekam = document.getElementById("mulaiRekam");
const closePopupBtn = document.getElementById("closePopupBtn");
const closePopupBtn1 = document.getElementById("closePopupBtn1");
const popup = document.getElementById("popup");
const popUpClose = document.getElementById("popUpClose");
const popUpReplay = document.getElementById("popUpReplay");
const popUpUlangRecord = document.getElementById("popUpUlangRecord");
const popUpTimeOut = document.getElementById("popUpTimeOut");
const playPauseBtn = document.getElementById("playPauseBtn");
const replayBtn = document.getElementById("replayBtn");
const finishBtn = document.getElementById("finishBtn");
const tooltip = document.getElementById("tooltip");
const imageElement = document.getElementById("imageElement");
const imageElementRecord = document.getElementById("imageElementRecord");
const btnTidakReplay = document.getElementById("btnTidakReplay");
const btnYaReplay = document.getElementById("btnYaReplay");
const ulangBtn = document.getElementById("ulangBtn");
const hidden = document.getElementById("hidden");
const selesaiBtn = document.getElementById("selesaiBtn");
const btnYaTimeOut = document.getElementById("btnYaTimeOut");
let countdownSeconds = 30;
let countdownInterval;

var waveAudio = document.getElementById("waveform");

const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "white",
  progressColor: "#149F54",
  barWidth: 3,
});

dengarkanScript.addEventListener("click", () => {
  popup.style.display = "block";

  playPauseBtn.addEventListener("click", () => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
      imageElement.src = "/Assets/icon-play-wav.svg";
    } else {
      wavesurfer.play();
      imageElement.src = "/Assets/icon-pause-wav.svg";
    }
  });

  replayBtn.addEventListener("click", () => {
    if (wavesurfer) {
      wavesurfer.pause();
      popUpReplay.style.display = "block";
      if (
        btnTidakReplay.addEventListener("click", () => {
          wavesurfer.pause();
          wavesurfer.play();
          popUpReplay.style.display = "none";
          popup.style.display = "block";
          imageElement.src = "/Assets/icon-pause-wav.svg";
          popUpReplay.style.display = "none";
        })
      ) {
      }
      if (
        btnYaReplay.addEventListener("click", () => {
          wavesurfer.stop();
          wavesurfer.play();
          popUpReplay.style.display = "none";
          popup.style.display = "block";
          imageElement.src = "/Assets/icon-pause-wav.svg";
        })
      ) {
      }
    } else {
    }
  });

  finishBtn.addEventListener("click", () => {
    popup.style.display = "none";
    hidden.style.display = "block";
  });

  wavesurfer.load("/Assets/Record.wav");

  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popUpClose.style.display = "block";
  });
});

// SCRIPT POP UP CLOSE SAAT MENDENGARKAN REKAMAN
closePopupBtn.addEventListener("click", () => {
  btnTidakClose.addEventListener("click", () => {
    popup.style.display = "block";
    popUpClose.style.display = "none";
  });

  btnYaClose.addEventListener("click", () => {
    window.location.href = "/Record.html";
  });
});

// SCRIPT POP UP CLOSE SAAT MENDENGARKAN REKAMAN
mulaiRekam.addEventListener("click", () => {
  popUpRecord.style.display = "block";
  countdown();
});

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
      window.location = "/Record2.html";
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
        window.location = "/Record2.html";
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
