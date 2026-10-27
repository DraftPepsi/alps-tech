const audio = document.getElementById("audio");
const status = document.getElementById("status");
const playButton = document.getElementById("playButton");

const params = new URLSearchParams(window.location.search);
const audioId = params.get("id");

// Add each person's first name and matching audio filename here.
const audioFiles = {
  carl: "Carl.mp3"
};

const selectedAudio = audioFiles[audioId?.toLowerCase()];

if (!selectedAudio) {
  status.textContent = "Invalid audio link.";
  playButton.hidden = true;
} else {
  audio.src = `audio/${selectedAudio}`;

  audio.addEventListener("canplay", function () {
    audio.play()
      .then(() => {
        status.textContent = `Now playing audio for ${audioId}.`;
        playButton.hidden = true;
      })
      .catch(() => {
        status.textContent = "Tap below to play your audio.";
        playButton.hidden = false;
      });
  }, { once: true });

  playButton.addEventListener("click", function () {
    audio.play().catch(() => {
      status.textContent = "Unable to play audio. Please try again.";
    });
  });

  audio.addEventListener("playing", function () {
    status.textContent = `Now playing audio for ${audioId}.`;
    playButton.hidden = true;
  });

  audio.addEventListener("ended", function () {
    status.textContent = "Audio finished.";
  });

  audio.addEventListener("error", function () {
    status.textContent = "Audio could not be loaded. Please check the file.";
    playButton.hidden = true;
  });

  audio.load();
}