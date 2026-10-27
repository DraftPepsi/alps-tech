
const audio = document.getElementById("audio");
const status = document.getElementById("status");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
const personName = document.getElementById("personName");

const params = new URLSearchParams(window.location.search);
const audioId = (params.get("id") || "carl").trim().toLowerCase();

const people = {
  carl: {
    name: "Carl",
    audio: "carl.mp3",
    cover: "carl.jpg"
  },
  jane: {
    name: "Kriss",
    audio: "kriss.mp3",
    cover: "kriss.jpg"
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
  status.textContent = message;
  playButton.disabled = true;
  progress.disabled = true;
}

if (!person) {
  personName.textContent = "Audio unavailable";
  showError("Invalid audio link.");
} else {
  personName.textContent = person.name;
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
      // Stop playback and reset to the beginning.
      resetAudio();
      status.textContent = "Audio stopped";
      return;
    }

    try {
      // Always start from the beginning when Play is pressed.
      audio.currentTime = 0;

      status.textContent = "Starting audio...";
      await audio.play();
    } catch (error) {
      console.error("Playback error:", error);
      status.textContent = `Playback failed: ${error.message}`;
    }
  });

  audio.addEventListener("play", () => {
    setStopButton();
    status.textContent = "Playing your audio message";
  });

  audio.addEventListener("pause", () => {
    // Keep the button consistent if audio stops unexpectedly.
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
