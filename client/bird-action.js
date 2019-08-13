const startChirping = () => {
  window.bird = new Bird();
  // Chirp at random interval
  randomChirp();

  // Chirp at regular interval
  // setInterval(() => {
  //   window.bird.trigger();
  // }, 1000);

  document.querySelector('tone-oscilloscope').bind(bird.voice.output);
};

let started = false;

// An initiall interaction is required to start audio
let volumeSlider = document.querySelector('#volume');
volumeSlider.addEventListener('input', e => {
  if (!started) {
    started = true;
    Tone.context.resume();
    startChirping();
  }

  masterVolume.volume.value = dbScale(e.target.value);
  setTimeout(() => {
    masterVolume.mute = false;
  }, 1000);
});


let randomChirp = () => {
  let time = Math.random() * 5000 + 100;
  setTimeout(() => {
    window.bird.trigger();
    randomChirp();
  }, time);
}