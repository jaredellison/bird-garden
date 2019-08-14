const startChirping = () => {
  // Chirp at random interval
  randomChirp();

  // Chirp at regular interval (uncomment for debugging)
  // setInterval(() => {
  //   window.bird.trigger();
  // }, 1000);
};

let randomChirp = () => {
  let time = Math.random() * 5000 + 100;
  setTimeout(() => {
    window.bird.trigger();
    randomChirp();
  }, time);
}

////////////////////////////////////////////////////////////
//
//    Main Action:

let started = false;
// An initial interaction with the volume slider is required to start audio
document.querySelector('#volume').addEventListener('input', e => {
  if (!started) {
    window.bird = new Bird();
    started = true;

    // Allow audio to start
    Tone.context.resume();

    // Unmute master volume and start chirping
    setTimeout(() => {
      masterVolume.mute = false;
      startChirping();
    }, 2000);

    // Connect oscilloscope for visualization
    document.querySelector('tone-oscilloscope').bind(bird.voice.output);
  }

  masterVolume.volume.value = dbScale(e.target.value);
});