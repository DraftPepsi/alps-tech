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

// Use lowercase filenames in the repository.
const people = {
  carl: {
    name: "Carl",
    audio: "carl.mp3",
    cover: "carl.jpg"
  },
  jane: {
    name: "Jane",
    audio: "jane.mp3",
    cover: "jane.jpg"
  }
};

const person = people[audioId];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function showError(message) {
  status.textContent = message;
  playButton.disabled = true;
  progress.disabled = true;
}

if (!person) {
  personName.textContent = "Audio unavailable";
  showError("Invalid link. Please check the URL.");
} else {
  personName.textContent = person.name;
  document.title = `${person.name} - Audio Message`;

  audio.src = `audio/${person.audio}`;
  cover.src = `covers/${person.cover}`;
  cover.alt = `${person.name}'s audio cover`;

  // Wait until the browser reads the audio metadata.
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    playButton.disabled = false;
    progress.disabled = false;
    status.textContent = "Tap play to listen";
  });

  // Update the playback timeline automatically.
  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // Allow seeking to another part of the audio.
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progress.value) / 100) * audio.duration;
    }
  });

  // Toggle play and pause.
  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        if (audio.ended) {
          audio.currentTime = 0;
        }

        await audio.play();
      } catch (error) {
        console.error("Playback error:", error);
        status.textContent =
          `Playback failed (${error.name}). Check the audio file.`;
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause audio");
    status.textContent = "Playing your audio message";
  });

  audio.addEventListener("pause", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play audio");

    if (!audio.ended) {
      status.textContent = "Audio paused";
    }
  });

  audio.addEventListener("ended", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play audio");
    progress.value = 0;
    currentTime.textContent = "0:00";
    status.textContent = "Audio finished";
  });

  audio.addEventListener("error", () => {
    console.error("Audio loading error:", audio.error);

    showError(
      "Audio could not load. Check the filename and audio folder."
    );
  });

  cover.addEventListener("error", () => {
    cover.alt = "Cover image unavailable";
  });

  audio.load();
}