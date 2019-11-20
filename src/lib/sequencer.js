import Tone from 'tone';
import { writable, get } from 'svelte/store';

// Esto lo tiene que cargar el loader para que sea reproducible
const mockNotes = [];

for (let i = 0; i <= 16; i++) {
  mockNotes.push('C');
}

const sequencer = writable({ time: 0, step: 0 });
const recording = writable(false)
const starter = writable(false);

const playPause = () => {
  starter.update(n => !n);
};

const trigger = (toPlay) => {
  toPlay.forEach(n => {
    n.synth.triggerAttackRelease(n.note, '2n').toMaster()
  })
};

const synthPart = new Tone.Sequence(
  function(time, note) {
    sequencer.update(n => {
      return { step: n.step === 16 ? 1 : n.step + 1, time, recording: get(recording) };
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

export { sequencer, playPause, trigger, recording };
