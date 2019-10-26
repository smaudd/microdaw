import Tone from 'tone';
import { writable, get } from 'svelte/store';
import { selectedSound, selectedPattern, sounds } from './state'

// Esto lo tiene que cargar el loader para que sea reproducible
const mockNotes = [];

for (let i = 0; i <= 16; i++) {
  mockNotes.push('C');
}

const sequencer = writable({ time: 0, step: 0 });
const steps = writable({})
const patterns = writable({})
const starter = writable(false);

const initSteps = () => {
  steps.update(n => {
    // Buen sitio para buscar en memoria
    for (let i = 1; i <= 16; i++) {
      n[i] = []
    }
    return n
  })
}

const initPatterns = () => {
  patterns.update(n => {
    // Buen sitio para buscar en memoria
    for (let i = 1; i <= 16; i++) {
      // Crea el pattern
      n[i] = []
      for (let j = 0; j < 16; j++) {
        // Crea el step
        n[i][j] = []
      }
    }
    return n
  })
}

const setStep = (step, note) => {
  patterns.update(n => {
    const sound = get(sounds)[get(selectedSound)]
    const pattern = get(selectedPattern)
    const indexedStep = step === 0 ? 0 : step - 1
    if (!note) {
      const pop = n[pattern][indexedStep].filter(v => v.sound !== get(selectedSound))
      n[pattern][indexedStep] = pop
      return n
    }
    if (n[pattern][indexedStep].length < 4) {
      n[pattern][indexedStep].push({ note, synth: sound.synth, sound: get(selectedSound) })
      return n
    }
  })
}

const playPause = () => {
  starter.update(n => !n);
};

const synth = new Tone.MembraneSynth().toMaster();
const synth2 = new Tone.MonoSynth().toMaster();
const synth3 = new Tone.Synth().toMaster();
const synth4 = new Tone.Synth().toMaster();
synth4.oscillator.type = 'triangle';
const poly = new Tone.PolySynth().toMaster();


const trigger = (toPlay) => {
  toPlay.forEach(n => {
    n.synth.triggerAttackRelease(n.note, '2n').toMaster()
  })
};
Tone.Transport.bpm.value = 240;
const synthPart = new Tone.Sequence(
  function(time, note) {
    sequencer.update(n => {
      return { step: n.step === 16 ? 1 : n.step + 1, time, note };
    });
  },
  mockNotes,
  "8n"
).start(0);

synthPart.loop = true;

sequencer.subscribe(({ time, step }) => {
  if (step !== 0) {
    const toPlay = get(patterns)[get(selectedPattern)][step - 1]
    if (toPlay.length > 0) {
      trigger(toPlay)
    }
  }
  // trigger(step, notes[step - 1], time);
});

starter.subscribe(value => {
  if (value) {
    return Tone.Transport.start();
  }
  sequencer.update(n => ({ time: 0, step: 0 }));
  return Tone.Transport.stop();
});

export { sequencer, playPause, initSteps, initPatterns, setStep, patterns };
