import Tone from "tone";
import { writable } from "svelte/store";

// Esto lo tiene que cargar el loader para que sea reproducible
const notes = [
  "C4",
  "D4",
  "E4",
  "F#4",
  "G#4",
  "A4",
  "B4",
  "C4",
  "C5",
  "D5",
  "E5",
  "F#5",
  "G#5",
  "A5",
  "B5",
  "C5"
];

const sequencer = writable({ time: 0, step: 0, note: notes[0] });
const starter = writable(false);

const playPause = () => {
  starter.update(n => !n);
};

const synth = new Tone.MembraneSynth().toMaster();
const synth2 = new Tone.MonoSynth().toMaster();
const synth3 = new Tone.Synth().toMaster();
const synth4 = new Tone.Synth().toMaster();
synth4.oscillator.type = 'triangle';
const poly = new Tone.PolySynth().toMaster();


// Aqui tendrias que quitar la nota
const trigger = (n, note, time) => {
  // if (n !== 8 && n !== 16) {
    synth.triggerAttackRelease('G5', "10hz", time);
    synth2.triggerAttackRelease('E4', "5hz", time);
    synth3.triggerAttackRelease('A4', "5hz", time);
    synth4.triggerAttackRelease('A8', "5hz", time);



  // }
};

const synthPart = new Tone.Sequence(
  function(time, note) {
    sequencer.update(n => {
      return { step: n.step === 16 ? 1 : n.step + 1, time, note };
    });
  },
  notes,
  "4n"
).start(0);

synthPart.loop = true;

sequencer.subscribe(({ time, step }) => {
  trigger(step, notes[step - 1], time);
});

starter.subscribe(value => {
  if (value) {
    return Tone.Transport.start();
  }
  sequencer.update(n => ({ time: 0, step: 0 }));
  return Tone.Transport.stop();
});

export { sequencer, playPause };
