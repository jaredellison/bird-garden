
const sliders = [
  { id: '#ifrq', property: 'ifrq' },
  { id: '#amp-atk', property: 'ampAtk' },
  { id: '#amp-dcy', property: 'ampDcy' },
  { id: '#fmod1', property: 'fmod1' },
  { id: '#atkf1', property: 'atkf1' },
  { id: '#dcyf1', property: 'dcyf1' },
  { id: '#fmod2', property: 'fmod2' },
  { id: '#atkf2', property: 'atkf2' },
  { id: '#dcyf2', property: 'dcyf2' },
  { id: '#amod1', property: 'amod1' },
  { id: '#atka1', property: 'atka1' },
  { id: '#dcya1', property: 'dcya1' },
  { id: '#amod2', property: 'amod2' },
  { id: '#atka2', property: 'atka2' },
  { id: '#dcya2', property: 'dcya2' }
];

for (let slider of sliders) {
  document.querySelector(slider.id).addEventListener('input', e => {
    try {
      window.bird[slider.property] = parseFloat(e.target.value);
    } catch (error) {
      console.warn('Please turn up volume first:\n', error)
    }
  });
}

////////////////////////////////////////
//  Oscilloscope

// Connect oscilloscope for debugging
// document.querySelector('tone-oscilloscope').bind(bird.amp1.output);
// document.querySelector('tone-oscilloscope').bind(bird.voice.freqModLfo);
// document.querySelector('tone-oscilloscope').bind(bird.voice.freqModVca1);
// document.querySelector('tone-oscilloscope').bind(bird.voice.freqModOffset);
// document.querySelector('tone-oscilloscope').bind(bird.voice.freqModVca2);
// document.querySelector('tone-oscilloscope').bind(bird.voice.vca);
