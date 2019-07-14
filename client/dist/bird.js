// Variables

// All scaled between 0 and 1
const params = {
  freq: 0,
  amp: {
    attack: 0,
    decay: 0
  },
  freqMod: {
    mod1: 0,
    attack1: 0,
    decay1: 0,
    mod2: 0,
    attack2: 0,
    decay2: 0
  },
  ampMod: {
    mod1: 0,
    attack1: 0,
    decay1: 0,
    mod2: 0,
    attack2: 0,
    decay2: 0
  }
};

const freqScale = n => {
  n * 7000 + 300;
};
const envScale = n => {
  n * 900;
};

const dbScale = n => {
  return Math.log10(n) * 20;
};

// Modules:
//  Env - 5
//  Osc - 3
//  VCA - 5 +?

let masterVolume = new Tone.Volume();
masterVolume.toMaster();
// let osc = new Tone.Oscillator();
// osc.chain(masterVolume, Tone.Master);
// osc.start();

document.body.innerHTML += `
<input type="range" id="start" name="volume" min="0" max="1" step=".01" value="0">
<label for="volume">Volume</label>
`;

let started = false;

let volumeSlider = document.querySelector("input[name='volume']");
volumeSlider.addEventListener('input', e => {
  if (!started) {
    started = true;
    Tone.context.resume();
    startChirping();
  }
  masterVolume.volume.value = dbScale(e.target.value);
});

class Bird {
  constructor() {
    this.modules = {};
  }
}

class FreqMod {
  constructor(modulation, attack, decay) {
    // Variable Params
    this.modulation = modulation || 0;
    this.attack = attack || 0;
    this.decay = decay || 0;

    // Static Params
    this.attackDecayScale = 900;
    this.modulationScale = 3000;

    // Tone modules
    this.envelope = new Tone.Envelope();
    this.vca = new Tone.Volume();
    this.multiply = new Tone.Multiply(this.modulationScale);

    // Connect modules
    this.envelope.chain(this.vca, this.multiply);
    this.output = this.multiply;
  }

  trigger() {
    this.node.triggerAttackRelease(0.6);
  }

  set modulation(value) {
    this.modulation = value;
    this.vca.value = value;
  }
}

class AmpMod {
  constructor(modulation, attack, decay) {
    // Variable Params
    this.modulation = modulation || 0;
    this.attack = attack || 0;
    this.decay = decay || 0;

    // Static Params
    this.attackDecayScale = 900;

    // Tone modules
    this.envelope = new Tone.Envelope();
    this.vca = new Tone.Volume();

    // Connect modules
    this.envelope.chain(this.vca, this.multiply);

    this.output = this.vca;
  }

  trigger() {
    this.node.triggerAttackRelease(0.6);
  }

  set modulation(value) {
    this.modulation = value;
    this.vca.value = value;
  }
}

class BirdVoice {
  constructor(attack, decay) {
    // Params
    this.attack = attack;
    this.decay = decay;

    // Static Params
    this.attackDecayScale = 900;

    /////////////////////
    //  Tone modules
    // Frequency Modulation
    this.freqModLfo = new Tone.Oscillator();
    this.freqModVca1 = new Tone.Volume();
    this.freqModOffset = new Tone.Add(1);
    this.freqModVca2 = new Tone.Volume();

    // Amplitude Modulation
    this.ampModLfo = new Tone.Oscillator();
    this.ampModVca1 = new Tone.Volume();
    this.ampModVca2 = new Tone.Volume();
    this.ampModOffset = new Tone.Add(-1);

    // Main Voice
    this.osc = new Tone.Oscillator(440, "sine");
    this.env = new Tone.Envelope();
    this.vca = new Tone.Volume();

    // Expose Inputs
    this.freqModInitIn = this.freqModVca2.volume;
    this.freqModAmpIn = this.freqModVca1.volume;
    this.freqModFreqIn = this.freqModLfo.frequency;

    this.ampModAmpIn = this.ampModVca1.volume;
    this.ampModFreqIn = this.ampModLfo.frequency;

    // Connect modules
    this.freqModLfo.chain(
      this.freqModVca1,
      this.freqModOffset,
      this.freqModVca2,
      this.osc.frequency,
      this.ampModVca2
    );

    this.ampModLfo.chain(
      this.ampModVca1,
      this.ampModOffset,
      this.ampModVca2,
      this.osc.frequency,
    );

    this.ampModVca2.connect(
      this.vca
    );

    this.env.connect(this.vca.volume);

    this.output = this.vca;

    // Start oscillator
    this.osc.start();
  }

  trigger() {
    console.log('chirp');
    this.env.triggerAttackRelease(0.6);
  }
}

// class Beeper {
//   constructor() {
//     this.osc = new Tone.Oscillator(440, 'sine');
//     this.vca = new Tone.Volume();
//     this.env = new Tone.Envelope();

//     this.osc.chain(this.vca, masterVolume);
//     this.env.connect(this.vca.volume);
//     this.osc.start();
//   }

//   trigger() {
//     this.env.triggerAttackRelease(0.6);
//   }
// }

// const startBeeping = () => {
  // const beep = new Beeper();
  // setInterval(() => {beep.trigger()}, 1000);
// }

const startChirping = () => {
  const bird = new BirdVoice(1, 2);
  bird.output.connect(masterVolume);

  setInterval(() => {bird.trigger()}, 1000);
}