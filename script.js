
const audio = document.getElementById("audio");
const status = document.getElementById("status");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
const personName = document.getElementById("personName");
const subtitle = document.querySelector(".subtitle");

const params = new URLSearchParams(window.location.search);
const audioId = (params.get("id") || "carl").trim().toLowerCase();

// Add each person's details here.
const people = {
  joeffrey: {
    name: "Joeffrey",
    audio: "joeffrey.wav",
    cover: "joeffrey.jpg",
    subtitle: "your audio message"
  },
  emman: {
    name: "Emman",
    audio: "emman.wav",
    cover: "emman.jpg",
    subtitle: "your audio message"
  },
  ericka: {
    name: "Ericka",
    audio: "ericka.wav",
    cover: "ericka.jpg",
    subtitle: "your audio message"
  },
  justin: {
    name: "Justin",
    audio: "justin.wav",
    cover: "justin.jpg",
    subtitle: "your audio message"
  },
  janine: {
    name: "Janine",
    audio: "janine.wav",
    cover: "janine.jpg",
    subtitle: "your audio message"
  },
  jj: {
    name: "JJ",
    audio: "jj.wav",
    cover: "jj.jpg",
    subtitle: "your audio message"
  },
  carl: {
    name: "Carl",
    audio: "carl.wav",
    cover: "carl.jpg",
    subtitle: "your audio message"
  },
  angelo: {
    name: "Angelo",
    audio: "angelo.wav",
    cover: "angelo.jpg",
    subtitle: "your audio message"
  },
  ivy: {
    name: "Ivy",
    audio: "ivy.wav",
    cover: "ivy.jpg",
    subtitle: "your audio message"
  },
  josh: {
    name: "Josh",
    audio: "josh.wav",
    cover: "josh.jpg",
    subtitle: "your audio message"
  },
  menchie: {
    name: "Menchie",
    audio: "menchie.wav",
    cover: "menchie.jpg",
    subtitle: "your audio message"
  },
  kriss: {
    name: "Kriss",
    audio: "kriss.wav",
    cover: "kriss.jpg",
    subtitle: "thank you for everything!"
  },
  joemar: {
    name: "Joemar",
    audio: "joemar.wav",
    cover: "joemar.jpg",
    subtitle: "your audio message"
  },
  april: {
    name: "April",
    audio: "april.wav",
    cover: "april.jpg",
    subtitle: "your audio message"
  },
  ann: {
    name: "Ann",
    audio: "ann.wav",
    cover: "ann.jpg",
    subtitle: "your audio message"
  },
  kim: {
    name: "Kim",
    audio: "kim.wav",
    cover: "kim.jpg",
    subtitle: "your audio message"
  },
  shane: {
    name: "Shane",
    audio: "shane.wav",
    cover: "shane.jpg",
    subtitle: "your audio message"
  },
  novel: {
    name: "Novel",
    audio: "novel.wav",
    cover: "novel.jpg",
    subtitle: "your audio message"
  },
  nica: {
    name: "Nica",
    audio: "nica.wav",
    cover: "nica.jpg",
    subtitle: "your audio message"
  },
  mela: {
    name: "Mela",
    audio: "mela.wav",
    cover: "mela.jpg",
    subtitle: "your audio message"
  },
  james: {
    name: "James",
    audio: "james.wav",
    cover: "james.jpg",
    subtitle: "your audio message"
  },
  marin: {
    name: "Marin",
    audio: "marin.wav",
    cover: "marin.jpg",
    subtitle: "your audio message"
  },
  ken: {
    name: "Ken",
    audio: "ken.wav",
    cover: "ken.jpg",
    subtitle: "your audio message"
  },
  railey: {
    name: "Railey",
    audio: "railey.wav",
    cover: "railey.jpg",
    subtitle: "your audio message"
  },
  mj: {
    name: "MJ",
    audio: "mj.wav",
    cover: "mj.jpg",
    subtitle: "your audio message"
  },
  renz: {
    name: "Renz",
    audio: "renz.wav",
    cover: "renz.jpg",
    subtitle: "your audio message"
  },
  zedrick: {
    name: "Zedrick",
    audio: "zedrick.wav",
    cover: "zedrick.jpg",
    subtitle: "your audio message"
  },
  chelsea: {
    name: "Chelsea",
    audio: "chelsea.wav",
    cover: "chelsea.jpg",
    subtitle: "your audio message"
  },
  jona: {
    name: "Jona",
    audio: "jona.wav",
    cover: "jona.jpg",
    subtitle: "your audio message"
  },
  hannah: {
    name: "Hannah",
    audio: "hannah.wav",
    cover: "hannah.jpg",
    subtitle: "your audio message"
  },
  adnil: {
    name: "Adnil",
    audio: "adnil.wav",
    cover: "adnil.jpg",
    subtitle: "your audio message"
  },
  dennison: {
    name: "Dennison",
    audio: "dennison.wav",
    cover: "dennison.jpg",
    subtitle: "your audio message"
  },
  eric: {
    name: "Eric",
    audio: "eric.wav",
    cover: "eric.jpg",
    subtitle: "your audio message"
  }
};

const person = people[audioId];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function setPlayButton() {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Play audio");
}

function setStopButton() {
  playButton.textContent = "■";
  playButton.setAttribute("aria-label", "Stop audio");
}

function resetAudio() {
  audio.pause();
  audio.currentTime = 0;

  progress.value = 0;
  currentTime.textContent = "0:00";

  setPlayButton();
}

function showError(message) {
  audio.pause();

  playButton.disabled = true;
  progress.disabled = true;

  setPlayButton();

  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";

  status.textContent = message;
}

if (!person) {
  personName.textContent = "Audio unavailable";

  if (subtitle) {
    subtitle.textContent = "This audio message is unavailable.";
  }

  showError("Invalid audio link.");
} else {
  personName.textContent = person.name;

  if (subtitle) {
    subtitle.textContent = person.subtitle || "Your audio message";
  }

  document.title = `${person.name} - Audio Message`;

  audio.src = `audio/${person.audio}`;
  cover.src = `covers/${person.cover}`;
  cover.alt = `${person.name}'s audio cover`;

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    status.textContent = "Tap play to listen";

    playButton.disabled = false;
    progress.disabled = false;
  });

  audio.addEventListener("canplay", () => {
    playButton.disabled = false;
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progress.value) / 100) * audio.duration;
    }
  });

  playButton.addEventListener("click", async () => {
    if (!audio.paused) {
      resetAudio();
      status.textContent = "Audio stopped";
      return;
    }

    try {
      audio.currentTime = 0;

      status.textContent = "Starting audio...";
      await audio.play();
    } catch (error) {
      console.error("Playback error:", error);
      status.textContent = "Playback failed. Please try again.";
    }
  });

  audio.addEventListener("play", () => {
    setStopButton();
    status.textContent = "Playing your audio message";
  });

  audio.addEventListener("pause", () => {
    setPlayButton();
  });

  audio.addEventListener("ended", () => {
    resetAudio();
    status.textContent = "Audio finished";
  });

  audio.addEventListener("error", () => {
    const errorCode = audio.error?.code;

    console.error("Audio loading error:", audio.error);

    const messages = {
      1: "Audio loading was cancelled.",
      2: "Network error while loading audio.",
      3: "The audio file could not be decoded.",
      4: "Audio format or file URL is not supported."
    };

    showError(
      messages[errorCode] ||
      "Audio could not load. Check the filename and file path."
    );
  });

  cover.addEventListener("error", () => {
    cover.alt = "Cover image unavailable";
  });

  audio.load();
}
