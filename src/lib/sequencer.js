import Tone from 'tone';
import { writable, get } from 'svelte/store';
import { sounds } from './state'

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

const trigger = (toPlay) => {
  toPlay.forEach(n => {
    n.synth.triggerAttackRelease(n.note, '2n').toMaster()
  })
};
// Tone.Transport.bpm.value = 240;
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

starter.subscribe(value => {
  if (value) {
    return Tone.Transport.start();
  }
  sequencer.update(n => ({ time: 0, step: 0 }));
  return Tone.Transport.stop();
});

export { sequencer, playPause, initSteps, setStep, trigger };
