const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backword");
const voice = document.getElementById("voice");
const container = document.getElementById("container");
const audioVolume = document.getElementById("audio-volume");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const proccessContainer = document.querySelector(".proccess-container");

let indexContent = 0;

const content = [
  "Abrobey- Qimmat Dunyo",
  "Jah Khalib - Медина",
  "Konsta-Qahramonlar",
  "Sherali Jo'rayev - Inson o'zing",
  "Hala-Madrid",
];

function changeMusic(index) {
  cover.src = `../images/${content[index]}.jpg`;
  audio.src = `../music/${content[index]}.mp3`;
  title.textContent = content[index];
}
changeMusic(indexContent);

function nextMusic() {
  if (content.length - 1 <= indexContent) {
    indexContent = 0;
  } else {
    indexContent++;
  }

  changeMusic(indexContent);
  play();
}

function prevMusic() {
  if (indexContent <= 0) {
    indexContent = content.length - 1;
  } else {
    indexContent--;
  }
  changeMusic(indexContent);
  play();
}

audio.volume = voice.value / 100;

voice.addEventListener("input", () => {
  audio.volume = voice.value / 100;
  audioVolume.textContent = voice.value;
});

function play() {
  container.classList.add("playing");
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pause() {
  container.classList.remove("playing");
  audio.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("playing");

  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

function playingMusic() {
  let duration = audio.duration;
  let currentTime = audio.currentTime;
  proccessContainer.style.width = `${(currentTime / duration) * 100}%`;
}

forwardBtn.addEventListener("click", nextMusic);
backwardBtn.addEventListener("click", prevMusic);
audio.addEventListener("ended", nextMusic);
audio.addEventListener("timeupdate", playingMusic);
