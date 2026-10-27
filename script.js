const audio = document.getElementById("audio");
const status = document.getElementById("status");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
const personName = document.getElementById("personName");

const params = new URLSearchParams(window.location.search);
const audioId = params.get("id")?.trim().toLowerCase();

// Add each person's name and exact filenames here.
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

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

if (!person) {
  status.textContent = "Invalid audio link.";
  playButton.disabled = true;
  progress.disabled = true;
} else {
  personName.textContent = person.name;
  document.title = `${person.name} - Audio Message`;

  audio.src = `audio/${person.audio}`;
  cover.src = `covers/${person.cover}`;
  cover.alt = `${person.name}'s audio cover`;

  // Display the actual duration of the selected audio file.
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    status.textContent = "Tap play to listen";
  });

  // Update the elapsed time and progress bar during playback.
  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // Allow the listener to seek through the audio.
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progress.value) / 100) * audio.duration;
    }
  });

  // Play or pause the audio.
    playButton.addEventListener("click", async () => {
    status.textContent = "Loading audio...";

    try {
        if (!audio.src) {
        throw new Error("Audio source is missing.");
        }

        if (audio.ended) {
        audio.currentTime = 0;
        }

        await audio.play();
    } catch (error) {
        console.error("Audio playback error:", error);

        status.textContent =
        `Playback failed: ${error.name}. Check the audio file and format.`;
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
    status.textContent = "Audio finished.";
  });

  audio.addEventListener("error", () => {
    status.textContent =
      "Audio could not be loaded. Check the filename and audio folder.";
  });

  cover.addEventListener("error", () => {
    cover.alt = "Cover image unavailable";
  });

  audio.load();
}